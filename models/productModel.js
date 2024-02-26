const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please Enter Product Name"],
        trim: true
    },
    description:{
        type:String,
        required: [true,"Please Enter Product Description"]
    },
    price:{
        type:String,
        required: [true,"Please Enter Product Price"],
        maxLength:[8,"Price cannot exceed 8 digits"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
    ],
    category:{
        type:String,
        required: [true,"Please Enter Product Category"]
    },
    stock:{
        type:String,
        required: [true,"Please Enter Product Stock"],
        maxLength:[4,"Stock cannot exceed 4 digits"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[  
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"users",
                required:true
        
            },
            name:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            },
            photo:{
                type:String,
                required: true,
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"users",
        required:true

    },
    careatedAt:{
        type:Date,
        default:Date.now
    },
    time:{
        type:Number,
        default:  Date.now
    }
})

module.exports = mongoose.model("products",productSchema)