import companyRepository from "../repositories/company.repository.js";
import AppError from "../utils/AppError.js";

class CompanyService {
  getCompanies(query) {
    return companyRepository.findAll(query, {
      searchFields: ["name", "description"],
    });
  }

  async getCompanyById(id) {
    const doc = await companyRepository.findById(id);
    if (!doc) throw new AppError("Company not found", 404);
    return doc;
  }

  createCompany(payload) {
    return companyRepository.create(payload);
  }

  async updateCompany(id, payload) {
    const doc = await companyRepository.updateById(id, payload);
    if (!doc) throw new AppError("Company not found", 404);
    return doc;
  }

  async deleteCompany(id) {
    const doc = await companyRepository.deleteById(id);
    if (!doc) throw new AppError("Company not found", 404);
    return true;
  }
}

export default new CompanyService();
