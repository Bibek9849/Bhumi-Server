const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    product_typeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product_types"
    },
    price: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    }
})

const product = mongoose.model("product", productSchema)
module.exports = product;