import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import companyService from "../services/company.service.js";

export const getCompanies = asyncHandler(async (req, res) => {
  const companies = await companyService.getCompanies(req.query);
  res.status(200).json({ status: "success", data: companies.data, pagination: companies.pagination });
});

export const getCompany = asyncHandler(async (req, res) => {
  const company = await companyService.getCompanyById(req.params.id);
  if (!company) throw new AppError("Company not found", 404);
  res.status(200).json({ status: "success", data: company });
});

export const createCompany = asyncHandler(async (req, res) => {
  const company = await companyService.createCompany(req.body);
  res.status(201).json({ status: "success", data: company });
});

export const updateCompany = asyncHandler(async (req, res) => {
  const company = await companyService.updateCompany(req.params.id, req.body);
  res.status(200).json({ status: "success", data: company });
});

export const deleteCompany = asyncHandler(async (req, res) => {
  await companyService.deleteCompany(req.params.id);
  res.status(204).json({ status: "success", data: null });
});
