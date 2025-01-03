const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers"
    },
    product_typeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product_type"
    },
    price: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: String,
        required: true
    }
})

const product = mongoose.model("product_type", productSchema)
module.exports = product;