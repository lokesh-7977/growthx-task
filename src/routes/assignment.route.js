import { Router } from "express";
import { uploadAssignment, getAssignmentsForAdmin, acceptAssignment, rejectAssignment } from "../controllers/assignment.controller.js";
import { authenticateAdmin, authenticateUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/upload',authenticateUser, uploadAssignment);
router.get('/assignments', getAssignmentsForAdmin);
router.post('/assignments/:id/accept',  acceptAssignment);
router.post('/assignments/:id/reject',  rejectAssignment);

export default router;