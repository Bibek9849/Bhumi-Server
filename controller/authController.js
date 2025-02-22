const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "d8044d3333d5b72d819c031e7a81570cd6dd478ddbbed18bd6cd060ba140ed9c";
const Credential = require("../model/credential");
const register = async (req, res) => {
    const { contact, password, role } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);
    const cred = new Credential({ contact, password: hashedpassword, role })
    cred.save();
    res.status(201).send(cred);

};

const login = async (req, res) => {
    const { contact, password } = req.body;
    const cred = await Credential.findOne({ contact });
    if (!cred || !(await bcrypt.compare(password, cred.password))) {
        return res.status(403).send('Invalid contact or password');
    }

    const token = jwt.sign({ contact: cred.contact, role: cred.role },
        SECRET_KEY, { expiresIn: '1h' })
    res.json({ token });


};


module.exports = {
    login,
    register
}