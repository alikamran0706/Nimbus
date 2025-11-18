import applicationRepository from "../repositories/application.repository.js";
import AppError from "../utils/AppError.js";

class ApplicationService {
  getApplications(query) {
    return applicationRepository.findAll(query, {});
  }

  async getApplicationById(id) {
    const doc = await applicationRepository.findById(id);
    if (!doc) throw new AppError("Application not found", 404);
    return doc;
  }

  createApplication(payload) {
    return applicationRepository.create(payload);
  }

  async updateApplication(id, payload) {
    const doc = await applicationRepository.updateById(id, payload);
    if (!doc) throw new AppError("Application not found", 404);
    return doc;
  }

  async deleteApplication(id) {
    const doc = await applicationRepository.deleteById(id);
    if (!doc) throw new AppError("Application not found", 404);
    return true;
  }
}

export default new ApplicationService();
