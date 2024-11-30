// middleware/auth.js
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const authenticateToken = (req, res, next) => {
    // Get token from header
    const authHeader = req.header("authorization");
    console.log("Authorization Header:", authHeader);

    // Check if authorization header is missing or not in the correct format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Extract the token by removing the "Bearer " prefix
    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token Payload:", decoded);

        // Attach decoded payload to request object
        req.user = decoded; // Access user info in req.user
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ msg: "Token is not valid" });
    }
};
module.exports = authenticateToken;
