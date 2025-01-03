const { date } = require("joi");
const mongoose = require("mongoose")
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    date: {
        type: String,
        required: true
    },
    total_amount: {
        type: String,
        required: true
    },
    total_quantity: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

const order = mongoose.model("orders", orderSchema)
module.exports = order;