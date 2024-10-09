import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const assignmentSchema = new mongoose.Schema(
  {
    task: { type: String, required: true }, 
    userId: { type: String, ref: 'User', required: true },
    status: { type: String, enum: ['active', 'completed', 'rejected'], default: 'active' }, 
  },
  { timestamps: true } 
);

export const Assignment = mongoose.model('Assignment', assignmentSchema);
