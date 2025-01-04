const Detail = require("../model/orderDetail");
const { param } = require("../route/orderDetailRoute");
const findAll = async (req, res) => {
    try {
        const details = await Detail.find();
        res.status(200).json(details);
    } catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const details = new Detail(req.body);
        await details.save();
        res.status(201).json(details)
    } catch (e) {
        res.json(e)
    }
}

const findbyId = async (req, res) => {
    try {
        const details = await Detail.findById(req.params.id);
        res.status(200).json(details)
    } catch (e) {

        res.json(e)
    }
}
const deletebyId = async (req, res) => {
    try {
        const details = await Detail.findByIdAndDelete(req.params.id);
        res.status(200).json("Data Deleted")
    } catch (e) {

        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const details = await Detail.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(details)
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