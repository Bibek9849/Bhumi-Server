const User = require("../model/user");
const { param } = require("../route/userRoute");
const findAll = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const { fullname, contact_no, address, password } = req.body
        const users = new User({
            fullname,
            contact_no,
            address,
            password,
            image: req.file.originalname
        });
        await users.save();
        res.status(201).json(users)
    } catch (e) {
        res.json(e)
    }
}

module.exports = {
    findAll,
    save
}