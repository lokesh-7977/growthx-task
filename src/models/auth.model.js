import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

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

export const Auth = mongoose.model("Auth", authSchema);