const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    contact_no: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("users", userSchema)
module.exports = User;