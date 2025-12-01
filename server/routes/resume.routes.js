import express from "express";
import { parseResumeFile,  getResumes, getResume, createResume, updateResume, deleteResume, downloadResume } from "../controllers/resume.controller.js";

import { verifyAuth } from "../middleware/auth.js";
import { debugFileUpload, tempUpload } from "../config/cloudinary.js";

const router = express.Router();

router.use(verifyAuth);

// router.post("/parse", parseResumeText);
router.post("/upload",  debugFileUpload, tempUpload.single("resume"), parseResumeFile);

router
    .route("/")
    .get(getResumes)
    .post(createResume);

router
    .route("/:id")
    .get(getResume)
    .put(updateResume)
    .delete(deleteResume);

    // Download resume file
router.get("/:id/download", downloadResume);


export default router;
