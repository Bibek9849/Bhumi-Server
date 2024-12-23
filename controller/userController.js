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


module.exports = {
    findAll,

}