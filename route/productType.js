const mongoose = require("mongoose")
const productTypeSchema = new mongoose.Schema({
    product_categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product_category"
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const productType = mongoose.model("product_type", productTypeSchema)
module.exports = productType;