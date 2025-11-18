import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import candidateService from "../services/candidate.service.js";
import { parse } from "csv-parse/sync";

export const getCandidates = asyncHandler(async (req, res) => {
  const result = await candidateService.getCandidates(req.query);
  res.status(200).json({ status: "success", data: result.data, pagination: result.pagination });
});

export const getCandidate = asyncHandler(async (req, res) => {
  const candidate = await candidateService.getCandidateById(req.params.id);
  if (!candidate) throw new AppError("Candidate not found", 404);
  res.status(200).json({ status: "success", data: candidate });
});

export const createCandidate = asyncHandler(async (req, res) => {
  const candidate = await candidateService.createCandidate(req.body);
  res.status(201).json({ status: "success", data: candidate });
});

export const updateCandidate = asyncHandler(async (req, res) => {
  const candidate = await candidateService.updateCandidate(req.params.id, req.body);
  res.status(200).json({ status: "success", data: candidate });
});

export const deleteCandidate = asyncHandler(async (req, res) => {
  await candidateService.deleteCandidate(req.params.id);
  res.status(204).json({ status: "success", data: null });
});

// CSV bulk
export const importCandidatesFromCsv = asyncHandler(async (req, res) => {
  if (!req.file) throw new AppError("CSV file is required", 400);

  const content = req.file.buffer.toString("utf8");
  const records = parse(content, { columns: true, skip_empty_lines: true });

  const created = await candidateService.createCandidatesBulk(records);
  res.status(201).json({ status: "success", count: created.length, data: created });
});

// Gmail / LinkedIn / WhatsApp mock
export const importFromGmail = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "success", message: "Gmail import processing..." });
});

export const importFromLinkedIn = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "success", message: "LinkedIn import processing..." });
});

export const importFromWhatsApp = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "success", message: "WhatsApp import processing..." });
});
