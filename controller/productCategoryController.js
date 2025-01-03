const ProductCategory = require("../model/productCategory");
const { param } = require("../route/productCategoryRoute");
const findAll = async (req, res) => {
    try {
        const category = await ProductCategory.find();
        res.status(200).json(category);
    } catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const category = new ProductCategory(req.body);
        await category.save();
        res.status(201).json(category)
    } catch (e) {
        res.json(e)
    }
}

const findbyId = async (req, res) => {
    try {
        const category = await ProductCategory.findById(req.params.id);
        res.status(200).json(category)
    } catch (e) {

        res.json(e)
    }
}
const deletebyId = async (req, res) => {
    try {
        const category = await ProductCategory.findByIdAndDelete(req.params.id);
        res.status(200).json("Data Deleted")
    } catch (e) {

        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const category = await ProductCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(category)
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