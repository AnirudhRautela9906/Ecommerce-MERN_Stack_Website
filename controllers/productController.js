const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require('cloudinary')


// Create Product  -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  
  let images = []
// to convert single image string into array and all images into array
  if(typeof req.body.images === "string"){
    images.push(req.body.images)
  }
  else{
    images = req.body.images
  }
  
  const imagesLink = []
  
  for(let i = 0; i < images.length; i++){
    const myCloud = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    })
    
    imagesLink.push({
      public_id:  myCloud.public_id ,
      url: myCloud.secure_url,
    })
  }
  req.body.images = imagesLink;
  
  req.body.user = req.user.id;
  
  
  let product = await Product.create(req.body);
  
  res.status(201).json({
    success: true,
    product,
  });
});



// Get All Products 
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
 
  const products = await Product.find().sort({"time":-1})

  res.status(200).json({
    success: true,
    products,
  });
});

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  let images = []

  if(typeof req.body.images === "string"){
    images.push(req.body.images)
  }
  else{
    images = req.body.images
  }

  if(images !== undefined){
    
    // Deleting Images from Cloudinary
  for(let i = 0; i < product.images.length; i++){
   await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    
  }
  
  const imagesLink = []
  
  for(let i = 0; i < images.length; i++){
    const myCloud = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    })
    
    imagesLink.push({
      public_id:  myCloud.public_id ,
      url: myCloud.secure_url,
    })
  }

  req.body.images = imagesLink;
}


  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product -- Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Deleting Images from Cloudinary

  for (let i = 0; i < product.images.length; i++) {
    const result =await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    
  }


  await product.deleteOne();

  res.status(200).json({
    success: true,
    messege: "Product deleted",
  });
});

// Get Product  Details 
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  // let product = await Product.findOne({name:"asd"});

  // No use cause already error is designed for wrong id 
  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }

  res.status(200).json({
    success: true,
    product,
    // productCount,
  });
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    email: req.user.email, 
    photo:req.user.avatar.url,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const hasPurchased = await Order.find({user:req.user.id})
  const hasPurchasedProduct = hasPurchased.find(
(rev) => rev.orderItems.find(
  (rev) => rev.productId.toString() === productId.toString()
)

  )
  
  if (!hasPurchasedProduct) {
    return next(new ErrorHandler("First Purchase the product", 404));
  }

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if(isReviewed) {
    product.reviews.filter((rev) => {
      if(rev.user.toString() === req.user._id.toString()){

        rev.photo = req.user.avatar.url
        rev.name = req.user.name
        rev.email = req.user.email
        rev.rating = rating;
        rev.comment = comment;
      }

    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    product,
  });
});

// Get All Reviews -- Admin
exports.getAllReviews = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete  Review -- Admin
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const reviewFound = product.reviews.find(
    (rev) => rev._id.toString() === req.query.id.toString()
  )
  if(!reviewFound){
    return next(new ErrorHandler("Review not found", 404));
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
    );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  if(reviews.length==0){
    const ratings = 0
    const numOfReviews = 0
    
    await Product.findByIdAndUpdate(
      req.query.productId,
      { reviews, ratings, numOfReviews },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    res.status(200).json({
      success: true,
    });
    
  }
  else{
  const ratings = avg / reviews.length;
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, numOfReviews },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({
    success: true,
  });
}
});
