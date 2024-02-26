// Create Token and saving in cookie

const sendToken = (user,statusCode,res)=>{
    const token = user.getJWTToken()
let options
    // options for cookie
    if (process.env.NODE_ENV !== "production") {
         options = {
            expires:new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
            // secure:true,
            // sameSite:"strict",
            // path:"/",
        }
    }
    else{
        options = {
           expires:new Date(
               Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
           ),
           httpOnly: true,
           secure:true,
           sameSite:"strict",
           path:"/",
       }

    }
    

    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        user,token
    })
}

module.exports = sendToken