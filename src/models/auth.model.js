import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuidv4";
const authSchema = new mongoose.Schema(
  {
    id: { type: String, default: () => uuidv4() },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

const Auth = mongoose.model("Auth", authSchema);
