import { Router } from "express";
import { login, register,getAllAdmins } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/admins",getAllAdmins)

export default router;