import { Assignment } from "../models/assignment.model.js";

export const uploadAssignment = async (req, res) => {
  const { task, adminId,userId } = req.body;

  if (!task || !adminId || !userId) {
    return res.status(400).json({ message: 'Task, adminId & userId are required to Upload assignment' });
  }

  try {
    const newAssignment = new Assignment({
      task,
      userId,
      admin: adminId,
      status: 'active',
    });

    await newAssignment.save();
    res.status(201).json({
      message: 'Assignment uploaded successfully',
      assignment: {
        id: newAssignment.uuid,
        task: newAssignment.task,
        status: newAssignment.status,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload assignment' });
  }
};

export const getAssignmentsForAdmin = async (req, res) => {
  const adminId = req.user.id;

  try {
    const assignments = await Assignment.find({ admin: adminId });
    res.status(200).json({ 
      assignments: assignments.map((assignment) => ({
        id : assignment.id,
        task: assignment.task,
        status: assignment.status,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve assignments' });
  }
};


export const acceptAssignment = async (req, res) => {
  const { id } = req.params;
  const adminId = req.user.id;

  try {
    const assignment = await Assignment.findOne({ _id: id, admin: adminId });
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found or you are not authorized' });
    }

    assignment.status = 'completed';
    await assignment.save();

    res.status(200).json({ message: 'Assignment accepted', assignment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to accept assignment' });
  }
};

export const rejectAssignment = async (req, res) => {
  const { id } = req.params;
  const adminId = req.user.id;

  try {
    const assignment = await Assignment.findOne({ _id: id, admin: adminId });
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found or you are not authorized' });
    }

    assignment.status = 'rejected';
    await assignment.save();

    res.status(200).json({ message: 'Assignment rejected', assignment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reject assignment' });
  }
};

