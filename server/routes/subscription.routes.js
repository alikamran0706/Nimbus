import express from "express";
import {getPlans, createPlan} from "../controllers/subscription.controller.js";
import { verifyAuth } from "../middleware/auth.js";
import { allowRoles } from "../middleware/role.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, getPlans)
  .post(verifyAuth, allowRoles("admin"), createPlan);

export default router;
