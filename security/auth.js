const jwt = require("jsonwebtoken");
const User = require("../model/student");  // Import the User model

// Use environment variables for secret key
const SECRET_KEY = process.env.JWT_SECRET;

// Authenticate Token
function authenticateToken(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).send("Access Denied: No token provided");
    }

    try {
        // Verify token
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;  // Attach the user to the request object
        next();  // Move to the next middleware
    } catch (e) {
        return res.status(400).send("Invalid token");
    }
}

// Authorize based on role
function authorizeRole(role) {
    return async (req, res, next) => {
        try {
            // Get the user from the database using the user ID decoded in the JWT
            const user = await User.findById(req.user.id);

            if (!user) {
                return res.status(404).send("User not found");
            }

            // Role should match the role in the database (string comparison)
            if (user.role !== role) {
                return res.status(403).send("Access Denied: Insufficient Permission");
            }

            next();  // Proceed to the next middleware or route handler
        } catch (err) {
            return res.status(500).send("Server error");
        }
    }
}

module.exports = { authenticateToken, authorizeRole };
