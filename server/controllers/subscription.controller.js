import asyncHandler from "../utils/asyncHandler.js";
import subscriptionService from "../services/subscription.service.js";

export const getPlans = asyncHandler(async (req, res) => {
  const result = await subscriptionService.getPlans(req.query);
  res.status(200).json({ status: "success", data: result.data, pagination: result.pagination });
});

export const createPlan = asyncHandler(async (req, res) => {
  const plan = await subscriptionService.createPlan(req.body);
  res.status(201).json({ status: "success", data: plan });
});
