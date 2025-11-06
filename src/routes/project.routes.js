import express from "express";
import { createProject, getProjects } from "../controllers/project.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/", verifyToken, createProject);
router.get("/", verifyToken, getProjects);

export default router;