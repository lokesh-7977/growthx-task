import { Router } from "express";
import { login, register,getAllAdmins, getAllUsers } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/admins",getAllAdmins)
router.get("/users",getAllUsers)

export default router;