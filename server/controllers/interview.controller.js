import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import interviewService from "../services/interview.service.js";

export const getInterviews = asyncHandler(async (req, res) => {
  const result = await interviewService.getInterviews(req.query);
  res.status(200).json({ status: "success", data: result.data, pagination: result.pagination });
});

export const getInterview = asyncHandler(async (req, res) => {
  const interview = await interviewService.getInterviewById(req.params.id);
  if (!interview) throw new AppError("Interview not found", 404);
  res.status(200).json({ status: "success", data: interview });
});

export const createInterview = asyncHandler(async (req, res) => {
  const interview = await interviewService.createInterview(req.body);
  res.status(201).json({ status: "success", data: interview });
});

export const updateInterview = asyncHandler(async (req, res) => {
  const interview = await interviewService.updateInterview(req.params.id, req.body);
  res.status(200).json({ status: "success", data: interview });
});

export const deleteInterview = asyncHandler(async (req, res) => {
  await interviewService.deleteInterview(req.params.id);
  res.status(204).json({ status: "success", data: null });
});
