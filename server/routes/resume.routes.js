import express from "express";
import {parseResumeText} from "../controllers/resume.controller.js";
import { verifyAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/parse", verifyAuth, parseResumeText);

export default router;
