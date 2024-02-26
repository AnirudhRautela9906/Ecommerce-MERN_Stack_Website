const express = require("express")
const { login, register, logout, getUserDetails, updateProfile, updatePassword, getAllUsers, getSingleUser, updateRole, deleteUser, addAddress, updateAddress, deleteAddress, forgotPassword, resetPassword, createCart, clearCart, removeItemCart, order, shipping } = require("../controllers/userController")
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth.js");

const router = express.Router()

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/logout").post(logout)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/me").get(isAuthenticatedUser,getUserDetails)
router.route("/shipping").put(isAuthenticatedUser,shipping)
router.route("/order").put(isAuthenticatedUser,order)
router.route("/cart/new").put(isAuthenticatedUser,createCart)
router.route("/cart/remove_item").put(isAuthenticatedUser,removeItemCart)
router.route("/cart/clear").put(isAuthenticatedUser,clearCart)
router.route("/address").post(isAuthenticatedUser,addAddress)
router.route("/existAddress/:id").put(isAuthenticatedUser,updateAddress).delete(isAuthenticatedUser,deleteAddress)
router.route("/me/update").put(isAuthenticatedUser,updateProfile)
router.route("/password/update").put(isAuthenticatedUser,updatePassword)
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("Admin"),getAllUsers)
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles("Admin"),getSingleUser)
.put(isAuthenticatedUser,authorizeRoles("Admin"),updateRole)
.delete(isAuthenticatedUser,authorizeRoles("Admin"),deleteUser)






module.exports = router