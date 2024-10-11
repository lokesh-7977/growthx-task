import { Router } from "express";
import {
  uploadAssignment,
  getAssignmentsForAdmin,
  acceptAssignment,
  rejectAssignment,
} from "../controllers/assignment.controller.js";
import {
  authenticateAdmin,
  authenticateUser,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/upload", authenticateUser, uploadAssignment);
router.get("/assignments",authenticateAdmin, getAssignmentsForAdmin);
router.post("/assignments/:id/accept",authenticateAdmin, acceptAssignment);
router.post("/assignments/:id/reject",authenticateAdmin, rejectAssignment);

export default router;
