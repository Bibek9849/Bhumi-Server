const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        default: null,
    },
    address: {
        type: String,
        default: null,
    },
    image: {
        type: String,
        default: null,

    },
    password: {
        type: String,
        required: true,
    }
})

const User = mongoose.model("user", userSchema)
module.exports = User;