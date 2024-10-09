import { Router } from "express";
import authRoute from "./auth.route.js";
import assignmentRoute from "./assignment.route.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/", assignmentRoute);

export default router;
