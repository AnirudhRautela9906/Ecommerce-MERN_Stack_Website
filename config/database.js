const mongoose = require("mongoose")

const connectDatabase = ()=>{
// if(process.env.NODE_ENV !== "production"){
//     mongoose.connect(process.env.DB_URI_LOCAL).then((data)=>{
//     console.log(`Mongodb connected with server: ${data.connection.host}`)
// })
// }
// else
{mongoose.connect(process.env.DB_URI_ONLINE).then((data)=>{
    console.log(`Mongodb connected with server: ${data.connection.host}`)
})}

// .catch((err)=>{console.log(err)})
// Error is handled

}

module.exports = connectDatabase
