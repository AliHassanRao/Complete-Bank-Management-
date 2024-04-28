const JWT = require("jsonwebtoken");
const User = require("../models/userModel.js");


requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// Admin access
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 1) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { requireSignIn, isAdmin };
