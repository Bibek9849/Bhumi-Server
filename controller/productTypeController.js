const ProductType = require("../model/ProductType");
const { param } = require("../route/productTypeRoute");

const findAll = async (req, res) => {
    try {
        const product_types = await ProductType.find();
        res.status(200).json(product_types);
    } catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const { product_categoryId, name, description } = req.body
        const product_types = new ProductType({
            product_categoryId,
            name,
            description,
            image: req.file.originalname
        });
        await product_types.save();
        res.status(201).json(product_types)
    } catch (e) {
        res.json(e)
    }
}

const findbyId = async (req, res) => {
    try {
        const ProductType = await ProductType.findById(req.params.id);
        res.status(200).json(ProductType)
    } catch (e) {

        res.json(e)
    }
}
const deletebyId = async (req, res) => {
    try {
        const product_types = await ProductType.findByIdAndDelete(req.params.id);
        res.status(200).json("Data Deleted")
    } catch (e) {

        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const product_types = await ProductType.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(product_types)
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