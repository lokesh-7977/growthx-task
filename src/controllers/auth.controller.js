import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { Auth } from "../models/auth.model.js";
import { config } from "../config/index.js";

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
    }

  const user = await Auth.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new Auth({
    id: uuidv4(),
    username,
    email,
    password: hashedPassword,
    role,
  });

  try {
    await newUser.save();
    res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const user = await Auth.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  const isMatchedPassword = await bcrypt.compare(password, user.password);
  if (!isMatchedPassword) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  jwt.sign(
    { id: user.uuid },
    config.jwtSecret,
    { expiresIn: config.jwt_expiry },
    (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          id: user.uuid,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    }
  );
};
