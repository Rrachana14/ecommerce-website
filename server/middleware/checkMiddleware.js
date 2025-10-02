const jwt = require('jsonwebtoken');



// checking if the user is logged in or not.
const verifyToken = (req, res, next) => {

    const token = req.header("Authorization");

    if (!token || !token.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }

    try {
        const actualToken = token.split(" ")[1]; 
        
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Token verification failed:", error.message);
        res.status(401).json({ message: "Invalid token." });
    }
};


module.exports = { verifyToken };
