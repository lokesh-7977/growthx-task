import { config } from "../config/index.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = config.jwtSecret;

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};


export const authenticateAdmin = (req, res, next) => {
  authenticateUser(req, res, () => {
    if (req.user && req.user.role === "admin") {
      return next(); 
    } else {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
  });
};

