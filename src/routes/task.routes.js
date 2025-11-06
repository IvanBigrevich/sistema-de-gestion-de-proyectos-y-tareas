import express from "express";
import { createTask, getTasks } from "../controllers/task.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";
const router = express.Router();

router.post("/", verifyToken, isAdmin, createTask);
router.get("/", verifyToken, getTasks);

export default router;