const { required } = require('joi');
const mongoose = require('mongoose');


const credSchema = new mongoose.Schema({
    contact: { type: String, required: true },
    password: { type: String, required: true, },
    role: { type: String, default: "admin", }
});


const Cred = mongoose.model('creds', credSchema);


module.exports = Cred;