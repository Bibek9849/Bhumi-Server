const joi = require("joi");

const userSchema = joi.object({
    fullname: joi.string().required(),
    contact_no: joi.string().required(),
    address: joi.string().required(),
    image: joi.string().required(),

    password: joi.string().required(),
})

function UserValidation(req, res, next) {
    const { fullname, contact_no, address, image, password } = req.body;
    const { error } = userSchema.validate({ fullname, contact_no, address, image, password })
    if (error) {
        return res.json(error)
    } next()
}

module.exports = UserValidation;