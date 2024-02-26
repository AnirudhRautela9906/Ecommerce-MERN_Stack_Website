const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAllReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("Admin"), getAllProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("Admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("Admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("Admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);
router
  .route("/reviews")
  .get(getAllReviews)
  .delete(isAuthenticatedUser, authorizeRoles("Admin"), deleteReview);
router.route("/review").put(isAuthenticatedUser, createProductReview);
module.exports = router;
