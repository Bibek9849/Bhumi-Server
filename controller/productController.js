const Product = require("../model/product");
const { param } = require("../route/productRoute");

const findAll = async (req, res) => {
    try {
        const types = await Product.find().populate("product_categoryId");
        res.status(200).json(types);
    } catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const { product_categoryId, name, price, quantity, description } = req.body
        const types = new Product({
            product_categoryId,
            name,
            price,
            quantity,
            description,
            image: req.file.originalname
        });
        await types.save();
        res.status(201).json(types)
    } catch (e) {
        res.json(e)
    }
}

const findbyId = async (req, res) => {
    try {
        const types = await Product.findById(req.params.id).populate("product_categoryId");
        res.status(200).json(types)
    } catch (e) {

        res.json(e)
    }
}
const deletebyId = async (req, res) => {
    try {
        const types = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Data Deleted")
    } catch (e) {

        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const types = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(types)
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