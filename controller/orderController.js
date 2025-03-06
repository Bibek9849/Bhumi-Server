const Order = require("../model/order");
const OrderDetail = require("../model/orderDetail"); // ✅ Import OrderDetail model
const { param } = require("../route/orderRoute");
const findAll = async (req, res) => {
    try {
        const details = await Detail.find()
            .populate({
                path: "orderId",
                select: "createdAt", // Ensure createdAt is selected
            })
            .populate({
                path: "productID",
                select: "image",
            });

        res.status(200).json({ success: true, data: details });
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


const save = async (req, res) => {
    try {
        console.log("Received Order Data:", req.body); // ✅ Debug incoming data

        const { cart, userId, orderDate, totalPrice, totalQuantity } = req.body;

        if (!orderDate || !totalPrice || !totalQuantity || !userId || !cart) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const order = new Order({
            date: orderDate,
            userId: userId,
            total_amount: totalPrice,
            total_quantity: totalQuantity
        });
        await order.save();

        if (cart && Array.isArray(cart)) {
            for (const item of cart) {
                const orderDetail = new OrderDetail({
                    orderId: order._id,
                    productID: item._id,
                    total_quantity: item.quantity,
                    sub_total: item.price
                });
                await orderDetail.save();
            }
        }

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (e) {
        console.error("Error:", e);
        res.status(500).json({ error: e.message });
    }
};


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