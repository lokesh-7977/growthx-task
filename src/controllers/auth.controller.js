import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { Auth } from "../models/auth.model.js";
import { config } from "../config/index.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
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
    name,
    email,
    password: hashedPassword,
    role,
  });

  const token = jwt.sign(
    { id: newUser.id, role: newUser.role },
    config.jwtSecret,
    { expiresIn: config.jwt_expiry }
  );

  try {
    await newUser.save();
    res.status(201).json({
      id: newUser.id,
      username: newUser.name,
      email: newUser.email,
      role: newUser.role,
      token,
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
    { id: user.uuid , role: user.role },
    config.jwtSecret,
    { expiresIn: config.jwt_expiry },
    (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          id: user.uuid,
          username: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }
  );
};


export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Auth.find({ role: "admin" });
    res.status(200).json({
      admins: admins.map((admin) => ({
        id: admin.id,
        username: admin.name,
        email: admin.email,
        role: admin.role,
      })),    
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getAllMembers = async (req, res) => {
  try {
    const users = await Auth.find({role : "user"});
    res.status(200).json({
      users: users.map((user) => ({
        id: user.id,
        username: user.name,
        email: user.email,
        role: user.role,
      })),    
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await Auth.find();
    res.status(200).json({
      users: users.map((user) => ({
        id: user.id,
        username: user.name,
        email: user.email,
        role: user.role,
      })),    
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}