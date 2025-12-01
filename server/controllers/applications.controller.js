import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import applicationService from "../services/applications.service.js";

export const getApplications = asyncHandler(async (req, res) => {
  const result = await applicationService.getApplications(req.query);
  res.status(200).json({ status: "success", data: result.data, pagination: result.pagination });
});

export const getApplication = asyncHandler(async (req, res) => {
  const item = await applicationService.getApplicationById(req.params.id);
  if (!item) throw new AppError("Application not found", 404);
  res.status(200).json({ status: "success", data: item });
});

export const createApplication = asyncHandler(async (req, res) => {
  req.body['user'] = req.user;
  const item = await applicationService.createApplication(req.body);
  res.status(201).json({ status: "success", data: item });
});

export const updateApplication = asyncHandler(async (req, res) => {
  const item = await applicationService.updateApplication(req.params.id, req.body);
  res.status(200).json({ status: "success", data: item });
});

export const deleteApplication = asyncHandler(async (req, res) => {
  await applicationService.deleteApplication(req.params.id);
  res.status(204).json({ status: "success", data: null });
});
