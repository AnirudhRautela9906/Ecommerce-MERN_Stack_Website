const ErrorHandler = require("../utils/errorhandler")

module.exports = (err, req ,res , next)=>{
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;


    // Wrong Mongodb Id error
    if(err.name=="CastError"){
        const message =`Resource not found. Invalid: ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    // Mongoose duplicate key error
    if(err.code==11000){
        // const message =`Duplicate ${Object.keys(err.keyValue)} Entered`
        const message ="Email Id already exists, please give another email address"
        err = new ErrorHandler(message, 400)
    }

    // Wrong JWT error
    if(err.name=="JsonWebTokenError"){
        const message ="Json Web Token is invalid, Try again"
        err = new ErrorHandler(message, 400)
    }

    // JWT expired error
    if(err.name=="TokenExpiredError"){
        // const message =`Duplicate ${Object.keys(err.keyValue)} Entered`
        const message ="Json Web Token is Expired, Try again"
        err = new ErrorHandler(message, 400)
    }


    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        statusCode:err.statusCode,
    });
}