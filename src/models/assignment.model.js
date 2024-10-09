import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const assignmentSchema = new mongoose.Schema(
  {
    id: { type: String, default: () => uuidv4() }, 
    task: { type: String, required: true }, 
    status: { type: String, enum: ['active', 'completed', 'rejected'], default: 'active' }, 
    userId: { type: String, ref: 'User', required: true }
  },
  { timestamps: true } 
);

export const Assignment = mongoose.model('Assignment', assignmentSchema);
