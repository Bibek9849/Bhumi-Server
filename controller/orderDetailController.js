const Detail = require("../model/orderDetail");
const Order = require("../model/order");

const { param } = require("../route/orderDetailRoute");
const findAll = async (req, res) => {
    try {
        const details = await Detail.find()
            .populate({
                path: "orderId",
                select: "status createdAt", // Fetch order status & created date
            })
            .populate({
                path: "productID",
                select: "name image", // Fetch product name & image
            });

        res.status(200).json({ success: true, data: details });
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


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