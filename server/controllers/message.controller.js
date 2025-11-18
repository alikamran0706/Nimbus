import asyncHandler from "../utils/asyncHandler.js";
import messageService from "../services/message.service.js";

export const getMessages = asyncHandler(async (req, res) => {
  const result = await messageService.getMessages(req.query);
  res.status(200).json({ status: "success", data: result.data, pagination: result.pagination });
});

export const createMessage = asyncHandler(async (req, res) => {
  const msg = await messageService.createMessage(req.body);
  res.status(201).json({ status: "success", data: msg });
});
