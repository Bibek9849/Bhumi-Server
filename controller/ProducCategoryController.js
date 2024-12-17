const ProductCategory = require("../model/ProductCategory");
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


module.exports = {
    findAll,
    save,

}