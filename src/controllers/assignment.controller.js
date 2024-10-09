import { Assignment } from "../models/assignment.model.js";

export const uploadAssignment = async (req, res) => {
  const { task, adminId } = req.body;
  const userId = req.user.id;

  try {
    const newAssignment = new Assignment({
      task,
      userId,
      admin: adminId,
      status: 'active',
    });

    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getAssignmentsForAdmin = async (req, res) => {
  const adminId = req.user.id;

  try {
    const assignments = await Assignment.find({ admin: adminId });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const acceptAssignment = async (req, res) => {
  const { id } = req.params;
  const adminId = req.user.id; 

  try {
    const assignment = await Assignment.findOne({ _id: id, admin: adminId });
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    assignment.status = 'completed';
    await assignment.save();
    res.status(200).json({ message: 'Assignment accepted', assignment });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const rejectAssignment = async (req, res) => {
  const { id } = req.params;
  const adminId = req.user.id; 

  try {
    const assignment = await Assignment.findOne({ _id: id, admin: adminId });
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    assignment.status = 'rejected';
    await assignment.save();
    res.status(200).json({ message: 'Assignment rejected', assignment });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
