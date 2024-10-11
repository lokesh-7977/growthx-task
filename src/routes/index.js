import { Router } from "express";
import authRoute from "./auth.route.js";
import assignmentRoute from "./assignment.route.js";

const router = Router();

router.get("/", (req, res) => res.send("Hello!! GrowthX Task Server!"));
router.get("/health", (req, res) => res.json({
  "Server Status": "Running",
  "Server Time": new Date().toLocaleString(),
  "Server Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
  "Server Port": port
}));

router.use("/", authRoute);
router.use("/", assignmentRoute);

export default router;
