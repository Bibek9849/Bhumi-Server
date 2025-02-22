const Customer = require("../model/user");
const { param } = require("../route/userRoute");
const nodemailer = require('nodemailer');
const findAll = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const { fullname, email, contact_no, address, password } = req.body
        const customer = new Customer({
            fullname,
            email,
            contact_no,
            address,
            password,
            image: req.file.originalname
        });
        await customer.save();

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            post: 587,
            secure: false,
            protocol: "smtp",
            auth: {
                user: "pandeybibe098k@gmail.com",
                pass: " hvhccrbyfxklchaj"
            }
        })

        const info = await transporter.sendMail({
            from: "pandeybibe098k@gmail.com",
            to: customer.email,
            subject: "Customer Registration",
            html: `
            <h1> Your Registration has been Completed </h1>
            <p> Your user id is ${customer.id}</p>
            `
        })
        res.status(201).json(customer, info)
    } catch (e) {
        res.json(e)
    }
}

const findbyId = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.status(200).json(customer)
    } catch (e) {

        res.json(e)
    }
}
const deletebyId = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        res.status(200).json("Data Deleted")
    } catch (e) {

        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(customer)
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