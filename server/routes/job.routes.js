import express from "express";
import { getJobs,createJob,getJob,updateJob,deleteJob,createJobsBulk,updateJobsBulk,
  deleteJobsBulk, } from "../controllers/job.controller.js";
import { verifyAuth } from "../middleware/auth.js";
import { allowRoles } from "../middleware/role.js";

const router = express.Router();

// GET all jobs / CREATE job
router
  .route("/")
  .get(verifyAuth, getJobs)
  .post(verifyAuth, allowRoles("admin", "recruiter"), createJob);

// GET / UPDATE / DELETE specific job
router
  .route("/:id")
  .get(verifyAuth, getJob)
  .put(verifyAuth, allowRoles("admin", "recruiter"), updateJob)
  .delete(verifyAuth, allowRoles("admin"), deleteJob);

// BULK operations
router.post("/bulk/create", verifyAuth, allowRoles("admin", "recruiter"), createJobsBulk);
router.patch("/bulk/update", verifyAuth, allowRoles("admin"), updateJobsBulk);
router.delete("/bulk/delete", verifyAuth, allowRoles("admin"), deleteJobsBulk);

export default router;
