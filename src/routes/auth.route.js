import { Router } from "express";
import { login, register,getAllAdmins, getAllUsers } from "../controllers/auth.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/admins",authenticateUser,getAllAdmins)
router.get("/users",getAllUsers)

export default router;