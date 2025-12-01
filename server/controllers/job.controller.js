import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import jobService from "../services/job.service.js";

export const getJobs = asyncHandler(async (req, res) => {
  const result = await jobService.getJobs(req.query);
  res.status(200).json({ status: "success", data: result.data, pagination: result.pagination });
});

export const getJob = asyncHandler(async (req, res) => {
  const job = await jobService.getJobById(req.params.id, { 
    includeApplications: includeApplications === "true" 
  });
  if (!job) throw new AppError("Job not found", 404);
  res.status(200).json({ status: "success", data: job });
});

export const createJob = asyncHandler(async (req, res) => {
  req.body['user'] = req.user;
  if (req.file) {
    req.body.media = {
      url: req.file.path,
      caption: req.body.caption || "",
      isPrimary: true
    };
  }
  const job = await jobService.createJob(req.body);
  res.status(201).json({ status: "success", data: job });
});

export const updateJob = asyncHandler(async (req, res) => {
  if (req.file) {
    req.body.media = {
      url: req.file.path,
      caption: req.body.caption || "",
      isPrimary: true
    };
  }
  const job = await jobService.updateJob(req.params.id, req.body);
  res.status(200).json({ status: "success", data: job });
});

export const deleteJob = asyncHandler(async (req, res) => {
  await jobService.deleteJob(req.params.id);
  res.status(204).json({ status: "success", data: null });
});

// 🔥 BULK ops
export const createJobsBulk = asyncHandler(async (req, res) => {
  const jobs = await jobService.createJobsBulk(req.body);
  res.status(201).json({ status: "success", count: jobs.length, data: jobs });
});

export const updateJobsBulk = asyncHandler(async (req, res) => {
  const result = await jobService.updateJobsBulk(req.body.filter, req.body.update);
  res.status(200).json({ status: "success", data: result });
});

export const deleteJobsBulk = asyncHandler(async (req, res) => {
  const result = await jobService.deleteJobsBulk(req.body.filter);
  res.status(200).json({ status: "success", data: result });
});
