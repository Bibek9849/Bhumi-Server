const Order = require("../model/order");
const { param } = require("../route/orderRoute");
const findAll = async (req, res) => {
    try {
        const order = await Order.find();
        res.status(200).json(order);
    } catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order)
    } catch (e) {
        res.json(e)
    }
}

const findbyId = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json(order)
    } catch (e) {

        res.json(e)
    }
}
const deletebyId = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Data Deleted")
    } catch (e) {

        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(order)
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