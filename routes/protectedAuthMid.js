const jwt = require("jsonwebtoken");

const protectedAuthMid = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided. Authorization denied." });
    }

    // Verify token
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userID = decodedData?.id;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token has expired. Please login again." });
    }

    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token. Authorization denied." });
    }

    // For any other errors, send a generic message
    res.status(500).json({ message: "An error occurred during token verification." });
  }
};

module.exports = protectedAuthMid;
