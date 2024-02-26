const express = require("express")
const { isAuthenticatedUser } = require("../middleware/auth.js");
const { checkout, paymentVerification, paymentKey, paymentFrontend } = require("../controllers/paymentController.js");

const router = express.Router()
router.route("/get_url").get(isAuthenticatedUser,paymentFrontend )
router.route("/get_key").get(isAuthenticatedUser,paymentKey )
router.route("/payment_order").post(isAuthenticatedUser,checkout )
router.route("/payment_verification").post(isAuthenticatedUser,paymentVerification )
module.exports = router