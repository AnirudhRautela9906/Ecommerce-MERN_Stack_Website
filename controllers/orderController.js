const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// //  Create an Order

// exports.newOrder = catchAsyncErrors(async (req, res, next) => {
//   const {
//     shippingInfo,
//     orderItems,
//     paymentInfo,
//     itemPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice,
//   } = req.body;

//   const order = await Order.create({
//     shippingInfo,
//     orderItems,
//     paymentInfo,
//     itemPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice,
//     paidAt: Date.now(),
//     user: req.user._id,
//   });

//   order.orderItems.forEach(async (o) => {
//     await updateStock(o.productId, o.quantity);
//   });


//   res.status(201).json({
//     success: true,
//     order,
//   });
// });

   
//  Create an Order

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.create({
    shippingInfo:req.user.shippingInfo,
    orderItems:req.user.cart,
    paymentInfo:{razorpay_signature,status:"succeeded"},
    itemPrice:req.user.order.itemPrice,
    taxPrice:req.user.order.taxPrice,
    shippingPrice:req.user.order.shippingPrice,
    totalPrice:req.user.order.totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  order.orderItems.forEach(async (o) => {
    await updateStock(o.productId, o.quantity);
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// Get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get logged in user orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id }).sort({"time":-1});

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get all orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find().sort({"time":-1});
  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});

// Update order status -- Admin
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

//   if (req.body.status === "Shipped") {
//   order.orderItems.forEach(async(orde) => {
//  await   updateStock(orde.productId, orde.quantity);
//   });
// }

  order.orderStatus = req.body.status;

  if(req.body.status === "Delivered"){
  order.deliveredAt = Date.now()

  }

  await order.save({validateBeforeSave: false})

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id,quantity){
  const product = await Product.findById(id)

  product.stock -= quantity

  await product.save({validateBeforeSave: false})

}

// Delete order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

 await order.deleteOne()

  res.status(200).json({
    success: true,

  });
});