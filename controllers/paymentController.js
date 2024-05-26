const Razorpay = require("razorpay");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const crypto = require("crypto");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const ErrorHandler = require("../utils/errorhandler.js");

exports.paymentFrontend = catchAsyncErrors(async (req, res, next) => {
  // Actually its the backend url
  if (process.env.NODE_ENV !== "production") {
    res.status(200).json({ url: `${process.env.FRONTEND_URL}` });
  } else {
    res.status(200).json({ url: `https://${req.get("host")}` });
  }
});

exports.paymentKey = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.user.cart)
  const product = await Product.find();
  for (let i = 0; i < req.user.cart.length; i++) {
    const checkStock =
      req.user.cart[i].quantity >
      product.find(
        (rev) => rev._id.toString() === req.user.cart[i].productId.toString()
      ).stock;

    if (checkStock) {
      const user = await User.findById(req.user.id);
      user.cart = [];
      await user.save({ validateBeforeSave: false });
      return next(new ErrorHandler("Product Stock Unavilable", 400));
    }
  }
  res.status(200).json({ key: process.env.RAJORPAY_API_KEY_ID });
});

exports.checkout = catchAsyncErrors(async (req, res, next) => {
  const instance = new Razorpay({
    key_id: process.env.RAJORPAY_API_KEY_ID,
    key_secret: process.env.RAJORPAY_API_SECRET,
  });
  const options = {
    amount: Number(req.body.plan_price * 100), // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
});

exports.paymentVerification = catchAsyncErrors(async (req, res, next) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAJORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    async function updateStock(id, quantity) {
      const product = await Product.findById(id);

      product.stock -= quantity;

      await product.save({ validateBeforeSave: false });
    }

    const order = await Order.create({
      shippingInfo: req.user.shippingInfo,
      orderItems: req.user.cart,
      paymentInfo: { id: razorpay_signature, status: "succeeded" },
      itemPrice: req.user.order.subtotal,
      taxPrice: req.user.order.tax,
      shippingPrice: req.user.order.shippingCharges,
      totalPrice: req.user.order.totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

    order.orderItems.forEach(async (o) => {
      await updateStock(o.productId, o.quantity);
    });

    const user = await User.findById(req.user.id);
    user.cart = [];

    await user.save({ validateBeforeSave: false });

    if (process.env.NODE_ENV !== "production") {
      res.redirect(`${process.env.FRONTEND_URL}/success`);
    } else {
      res.redirect(`https://${req.get("host")}/success`);
    }
  } else {
    res.status(400).json({
      success: false,
    });
  }
});
