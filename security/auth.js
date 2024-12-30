
const jwt = require("jsonwebtoken");
const SECRET_KEY = "d8044d3333d5b72d819c031e7a81570cd6dd478ddbbed18bd6cd060ba140ed9c";

function authenticateToken(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        res.status(401).send("Access Denied: No token provided")
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY)
        req.user = verified;
        next()
    } catch (e) {
        res.status(400).send("Invalid token")
    }
}

function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).send("Assess Denied: Insufficient Permission")

        } next();
    }

}
module.exports = { authenticateToken, authorizeRole }