const  express  = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const bodyParser = require("body-parser")
const errorMiddleware = require('./Middleware/error')
const path = require("path")


app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

// Routes
const user = require("./routes/userRoute")
const product = require('./routes/productRoute')
const order = require('./routes/orderRoute')
const payment = require("./routes/paymentRoute")
const categories = require("./routes/categoriesRoute")
app.use("/api/v1",user)
app.use('/api/v1',product)
app.use("/api/v1",payment)
app.use("/api/v1",categories)
app.use('/api/v1',order)




// Config 
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config({path:"Config/config.env"})
}
app.use(express.static(path.join(__dirname, "./frontend/build"))) 

app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname, "./frontend/build/index.html"))
})

// Middleware for Errors

app.use(errorMiddleware)

module.exports = app