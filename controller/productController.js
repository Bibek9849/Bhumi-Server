const Product = require("../model/product");
const { param } = require("../route/customerRoute");
const findAll = async (req, res) => {
    try {
        const product = await Product.find();
        res.status(200).json(product);
    } catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product)
    } catch (e) {
        res.json(e)
    }
}

const findbyId = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product)
    } catch (e) {

        res.json(e)
    }
}
const deletebyId = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Data Deleted")
    } catch (e) {

        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(product)
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