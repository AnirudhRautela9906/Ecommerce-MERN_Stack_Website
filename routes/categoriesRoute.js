const express = require("express")
const { isAuthenticatedUser ,authorizeRoles} = require("../middleware/auth.js");
const { createCategory, readCategory, updateCategory, deleteCategory } = require("../controllers/categoriesController.js");

const router = express.Router()
router.route("/categories").get(readCategory )
router.route("/category").post(isAuthenticatedUser,authorizeRoles("Admin"),createCategory )
router.route("/category/:id").put(isAuthenticatedUser,authorizeRoles("Admin"),updateCategory )
router.route("/category/:id").delete(isAuthenticatedUser,authorizeRoles("Admin"),deleteCategory )
module.exports = router