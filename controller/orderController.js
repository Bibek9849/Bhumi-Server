const Order = require("../model/order");
const order_detail = require("../model/orderDetail");
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
        const { cart, userId, orderDate, totalPrice, totalQuantity } = req.body.data;

        // Validate required fields
        if (!orderDate || !totalPrice || !totalQuantity) {
            return res.status(400).json({ error: 'Missing required fields: orderDate, totalPrice, or totalQuantity' });
        }

        console.log(cart, userId, orderDate, totalPrice, totalQuantity)

        // Create and save the order
        const order = new Order({
            date: orderDate,
            userId: userId,
            total_amount: JSON.stringify(totalPrice),
            total_quantity: JSON.stringify(totalQuantity)
        });
        await order.save();

        // Loop over the cart array to save each order detail
        if (cart && Array.isArray(cart)) {
            for (const item of cart) {
                const orderDetail = new order_detail({
                    orderId: order._id,
                    productID: item._id,
                    total_quantity: item.quantity,
                    sub_total: item.price
                });
                await orderDetail.save();
            }
        }

        res.status(201).json(order);
    } catch (e) {
        res.status(500).json(e);
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