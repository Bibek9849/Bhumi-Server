const { date } = require("joi");
const mongoose = require("mongoose")
const orderDetailSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders"
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },

    total_quantity: {
        type: String,
        required: true
    },
    sub_total: {
        type: String,
        required: true
    }
})

const order_detail = mongoose.model("order_details", orderDetailSchema)
module.exports = order_detail;