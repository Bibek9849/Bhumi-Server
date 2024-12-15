const mongoose = require("mongoose")
const customerSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    contact_no:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Customer = mongoose.model("customers",customerSchema)
module.exports=Customer;