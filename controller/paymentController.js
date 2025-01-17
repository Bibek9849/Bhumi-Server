const Payment = require("../model/payment");
const { param } = require("../route/paymentRoute");
const findAll = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const payments = new Payment(req.body);
        await payments.save();
        res.status(201).json(payments)
    } catch (e) {
        res.json(e)
    }
}

const findbyId = async (req, res) => {
    try {
        const payments = await Payment.findById(req.params.id);
        res.status(200).json(payments)
    } catch (e) {

        res.json(e)
    }
}
const deletebyId = async (req, res) => {
    try {
        const payments = await Payment.findByIdAndDelete(req.params.id);
        res.status(200).json("Data Deleted")
    } catch (e) {

        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const payments = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(payments)
    } catch (e) {

        res.json(e)
    }
}

module.exports = {
    findAll,
    save,
    findbyId,
    deletebyId,
    update
}