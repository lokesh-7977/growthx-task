import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    task: { type: String }, 
    userId: { type: String },
    adminId : { type: String },
    status: { type: String, enum: ['active', 'completed', 'rejected'], default: 'active' }, 
  },
  { timestamps: true } 
);

export const Assignment = mongoose.model('Assignment', assignmentSchema);
