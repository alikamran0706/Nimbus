import express from "express";
import {parseResumeFile, parseResumeText} from "../controllers/resume.controller.js";
import { verifyAuth } from "../middleware/auth.js";
import { resumeUpload } from "../config/cloudinary.js";

const router = express.Router();

router.post("/parse", verifyAuth, parseResumeText);
router.post("/upload-resume", verifyAuth, resumeUpload.single("resume"), parseResumeFile);

export default router;
