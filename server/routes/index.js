import { Router } from "express";
import { authRoutes } from "./auth.routes.js";

import companyRoutes from "./company.routes.js";
import jobRoutes from "./job.routes.js";
import candidateRoutes from "./candidate.routes.js";
import applicationRoutes from "./applications.routes.js";
import interviewRoutes from "./interview.routes.js";
import messageRoutes from "./message.routes.js";
import callTranscriptRoutes from "./callTranscript.routes.js";
import resumeRoutes from "./resume.routes.js";
import subscriptionRoutes from "./subscription.routes.js";
import aiRoutes from "./ai.routes.js";

const router = Router();

router.use("/auth", authRoutes);

router.use("/companies", companyRoutes);
router.use("/jobs", jobRoutes);
router.use("/candidates", candidateRoutes);
router.use("/applications", applicationRoutes);
router.use("/interviews", interviewRoutes);
router.use("/messages", messageRoutes);
router.use("/calls", callTranscriptRoutes);
router.use("/resumes", resumeRoutes);
router.use("/subscriptions", subscriptionRoutes);
router.use("/ai", aiRoutes);

export default router;