const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Categories = require("../models/categoriesModel");
const ErrorHandler = require("../utils/errorhandler.js");

// Create Category

exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  const { category } = req.body;
  const existCategory= await Categories.find({ category: category })
  if (existCategory.length !== 0) {
    return next(new ErrorHandler("Category already exist", 404));
  }
  await Categories.create({ category: category });
  const categories = await Categories.find();
  res.status(200).json({
    success: true,
    categories,
  });
});

// Read Category

exports.readCategory = catchAsyncErrors(async (req, res, next) => {
  const categories = await Categories.find();
  res.status(200).json({
    success: true,
    categories,
  });
});

// Update Category

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
console.log(req.body)
  const existCategory = req.body.category;
  let category = await Categories.findById(req.params.id);
  if (!category) {
    return next(new ErrorHandler("Category not found", 400));
  }
  category = await Categories.findByIdAndUpdate(
    req.params.id,
    { category: existCategory },
    {
      new: true,
      runValidators: true,
      userFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    category,
  });
});

// Delete Category

exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Categories.findById(req.params.id);
  if (!category) {
    return next(new ErrorHandler("Category not found", 400));
  }

  await category.deleteOne();

  res.status(200).json({
    success: true,
  });
});
