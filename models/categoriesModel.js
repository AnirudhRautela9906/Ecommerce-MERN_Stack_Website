const mongoose = require('mongoose')

const categoriesSchema = new mongoose.Schema({
    
    category:{
        type:String,
        required: [true,"Please Enter Product Category"]
    }
    
})

module.exports = mongoose.model("categories",categoriesSchema)