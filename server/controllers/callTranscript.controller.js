import asyncHandler from "../utils/asyncHandler.js";
import callTranscriptService from "../services/callTranscript.service.js";

export const getCallTranscripts = asyncHandler(async (req, res) => {
  const result = await callTranscriptService.getTranscripts(req.query);
  res.status(200).json({ status: "success", data: result.data, pagination: result.pagination });
});

export const createTranscript = asyncHandler(async (req, res) => {
  const transcript = await callTranscriptService.createTranscript(req.body);
  res.status(201).json({ status: "success", data: transcript });
});
