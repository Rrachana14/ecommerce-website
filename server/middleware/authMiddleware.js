const jwt = require('jsonwebtoken'); // ✅ Ensure jwt is imported
const user = require("../models/User");

exports.protectedRoute = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  
  
  if (!token) {
    return res.status(401).json({ message: '...No token found' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    req.user = decoded;  
    next();  
  } catch (err) {
    console.error('Error verifying token:', err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};


exports.verifyAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res
      .status(403)
      .json({ message: "Access restricted to admins only" });
  }
  next();
};

