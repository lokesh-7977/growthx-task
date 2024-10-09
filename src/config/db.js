import mongoose from "mongoose";
import { config } from "./index.js";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(config.db);
    console.log("Database connected to MONGODB");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;