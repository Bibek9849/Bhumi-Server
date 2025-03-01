const { date } = require("joi");
const mongoose = require("mongoose")
const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },
    payment_method: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

const payment = mongoose.model("payments", paymentSchema)
module.exports = payment;