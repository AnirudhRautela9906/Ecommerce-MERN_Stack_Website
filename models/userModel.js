const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have atleast 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  phone: {
    type: String,
    maxLength: [10, "Phone Number cannot exceed 10 digits"],
    minLength: [10, "Phone Number cannot be less than 10 digits"],
    default: 1234567890,
    required: [true, "Update Your Phone Number In Profile"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 charaters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  gender: {
    type: String,
    default: "Update Your Gender In Profile",
    required: true,
  },
  role: {
    type: String,
    default: "User",
    required: true,
  },
  
  address: [
    {
      line: {
        type: String,
        maxLength: [100, "Address cannot exceed 100 characters"],
        required: true,
      },
      city: {
        type: String,
        maxLength: [100, "City cannot exceed 100 characters"],
        required: true,
      },
      landmark: {
        type: String,
        maxLength: [100, "Landmark cannot exceed 100 characters"],
        required: true,
      },
      pincode: {
        type: Number,
        maxLength: [10, "Pincode cannot exceed 10 characters"],
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
  ],

  // Cart System

  cart: [
    {
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "products",
        required: [true, "Please Enter Product ID"],
      },
      name: {
        type: String,
        required: [true, "Please Enter Product Name"],
        trim: true,
      },
      price: {
        type: String,
        required: [true, "Please Enter Product Price"],
        maxLength: [8, "Price cannot exceed 8 digits"],
      },
      image: {
        type: String,
        required: true,
      },
      stock:{
        type:String,
        required: [true,"Please Enter Product Stock"],
        maxLength:[4,"Stock cannot exceed 4 digits"],
        default:1
    },

      quantity: {
        type: String,
        required: [true, "Please Enter Product Stock"],
        maxLength: [4, "Stock cannot exceed 4 digits"],
        default: 1,
      },
    },
  ],
  shippingInfo:{
    address:{type: String},
    city:{type: String},
    state:{type: String},
    country:{type: String},
    pincode:{type:Number},
    phoneNo:{type:Number},
},
  order:{
    subtotal: {
      type: String,
    },
    shippingCharges: {
      type: String,
    },
    tax: {
      type: String,
    },
    totalPrice: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Hashing the password #Bcrypt

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT Token

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//  Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//  Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("users", userSchema);
