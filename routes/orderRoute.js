const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
// router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router
  .route("/admin/orders/all").get(isAuthenticatedUser, authorizeRoles("Admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("Admin"), updateOrderStatus)
  .delete(isAuthenticatedUser, authorizeRoles("Admin"), deleteOrder);

module.exports = router;
