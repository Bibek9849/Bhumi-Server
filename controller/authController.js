const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "d8044d3333d5b72d819c031e7a81570cd6dd478ddbbed18bd6cd060ba140ed9c";
const Credential = require("../model/credential");
const register = async (req, res) => {
    const { username, password, role } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);
    const cred = new Credential({ username, password: hashedpassword, role })
    cred.save();
    res.status(201).send(cred);

};

const login = async (req, res) => {
    const { username, password } = req.body;
    const cred = await Credential.findOne({ username });
    if (!cred || !(await bcrypt.compare(password, cred.password))) {
        return res.status(403).send('Invalid username or password');
    }

    const token = jwt.sign({ username: cred.username, role: cred.role },
        SECRET_KEY, { expiresIn: '1h' })
    res.json({ token });


};


module.exports = {
    login,
    register
}