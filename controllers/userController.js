const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler.js");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Product = require("../models/productModel");

// Register a User

exports.register = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 500,
    crop: "scale",
  });

  let { name, email, password } = req.body;
  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password and Confirm Password are different", 400)
    );
  }

  // User Creation
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  
  if (user.email.toString() === process.env.OWNER_EMAIL) {
    user.role = "Admin"
    await user.save()
  }
  sendToken(user, 201, res);
});

// Login User
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking for email and password

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Email Id does not exist", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
 

  sendToken(user, 200, res);
});

// Logout User

exports.logout = catchAsyncErrors(async (req, res, next) => {
  
  if (process.env.NODE_ENV !== "production") {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
}
else{
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure:true,
    path: "/",
    sameSite:"strict",maxAge:0
  });
}
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 401));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
  };
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 500,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    userFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user
  });
});

// Update User Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password and Confirm Password are different.", 400)
    );
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// Get all Users --- Admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Get single User
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`No such user found with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Role -- ADMIN
exports.updateRole = catchAsyncErrors(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`No such user found with Id: ${req.params.id}`)
    );
  }
  const newUserData = {
    role: req.body.role,
  };

  //  To avoid Role Change of Owner
  if (process.env.OWNER_EMAIL) {
    if (user.email.toString() === process.env.OWNER_EMAIL && req.body.role === "User") {
      return next(new ErrorHandler(`Owner role cannot be updated`));
    }
  }
  user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    userFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Delete User -- ADMIN
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`No such user found with Id: ${req.params.id}`)
    );
  }

  //  To avoid deletion of Owner

  if (user.email.toString() === process.env.OWNER_EMAIL) {
      return next(new ErrorHandler(`Owner cannot be deleted`));
  }

  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);
  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

// Forgot Password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
let resetPasswordUrl
  if (process.env.NODE_ENV !== "production")
  { resetPasswordUrl = `${process.env.FRONTEND_URL}/reset_password/${resetToken}`}
  else { resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/reset_password/${resetToken}`;}

  const message = `Your password reset link :- \n\n ${resetPasswordUrl} \n\nClick on this link to set New Password for your Ecommerce Account. \n\nIf you have not requested this email then please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully. Please also check your "Spam Folder"`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //  Creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password and Confirm Password are different.", 400)
    );
  }

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save();
  sendToken(user, 200, res);
});

// Address

exports.addAddress = catchAsyncErrors(async (req, res, next) => {
  const { line, city, landmark, pincode, state, country } = req.body;
  const address = {
    line,
    city,
    landmark,
    pincode,
    state,
    country,
  };

  const user = await User.findById(req.user._id);
  user.address.push(address);

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    user,
  });
});

// Update Address
exports.updateAddress = catchAsyncErrors(async (req, res, next) => {
  const { line, city, landmark, pincode, state, country } = req.body;
  // console.log(req.params)
  const user = await User.findById(req.user._id);
  const isAddress = user.address.find(
    (rev) => rev._id.toString() === req.params.id.toString()
  );

  if (isAddress) {
    user.address.filter((rev) => {
      if (rev._id.toString() === req.params.id.toString()) {
        rev.line = line;
        rev.city = city;
        rev.landmark = landmark;
        rev.pincode = pincode;
        rev.state = state;
        rev.country = country;
      }
    });
  }

  await user.save({ validateBeforeSave: false });


  res.status(200).json({
    success: true,
    user,
  });
});

// Delete Address
exports.deleteAddress = catchAsyncErrors(async (req, res, next) => {
  const existuser = await User.findById(req.user._id);
  const address = existuser.address.filter(
    (rev) => rev._id.toString() !== req.params.id.toString()
  );

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { address },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({
    success: true,
    user,
  });
});

// Cart
exports.createCart = catchAsyncErrors(async (req, res, next) => {
  const { productId, quantity, name, price, image, stock } = req.body;
  const user = await User.findById(req.user.id);
  const newProduct = { productId, quantity, name, price, image, stock };


    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

 const isAddedToCart = user.cart.find((rev) => 
   rev.productId.toString() === productId.toString())

  if (isAddedToCart) {
    user.cart.filter((rev) => {
      if (rev.productId.toString() === productId.toString()) {
        rev.name = name;
        rev.price = price;
        rev.stock = stock;
        rev.image = image;
        rev.quantity = quantity;
      }
    });
  } else {
    user.cart.unshift(newProduct);
  }

  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
    user,
  });
});

// Remove Item from cart
exports.removeItemCart = catchAsyncErrors(async (req, res, next) => {
  const { productId} = req.body;
  const existUser = await User.findById(req.user.id);
  const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
   const cart= existUser.cart.filter((rev) =>  rev.productId.toString() !== productId.toString() );   

   const user = await User.findByIdAndUpdate(
    req.user._id,
    { cart },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(201).json({
    success: true,
    user,
  });
});
  // Cart Clear
exports.clearCart = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  user.cart = [];

  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
    user,
  });
});

exports.shipping = catchAsyncErrors(async (req, res, next) => {
  const {address,pincode,city,state,country,phoneNo}=req.body
  const user = await User.findById(req.user.id);
  user.shippingInfo.address = address;
  user.shippingInfo.city = city;
  user.shippingInfo.state = state;
  user.shippingInfo.country = country;
  user.shippingInfo.phoneNo = phoneNo;
  user.shippingInfo.pincode = pincode;

  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
    user,
  });
})

// order 
exports.order = catchAsyncErrors(async (req, res, next) => {

  const {subtotal,shippingCharges,tax,totalPrice} = req.body

  const order = {subtotal,shippingCharges,tax,totalPrice}

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { order },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res.status(200).json({
    success: true,
    user,
  });
})