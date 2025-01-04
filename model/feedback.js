const { date } = require("joi");
const mongoose = require("mongoose")
const feedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },

    feedback: {
        type: String,
        required: true
    }
})

const feedback = mongoose.model("feedbacks", feedbackSchema)
module.exports = feedback;