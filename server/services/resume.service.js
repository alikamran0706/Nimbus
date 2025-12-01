import resumeRepository from "../repositories/resume.repository.js"
import AppError from "../utils/AppError.js";

class ResumeService {
  getResumes(query) {
    return resumeRepository.findAll(query, {});
  }

  async getResumeById(id) {
    const doc = await resumeRepository.findById(id);
    if (!doc) throw new AppError("Resume not found", 404);
    return doc;
  }

  createResume(payload) {
    return resumeRepository.create(payload);
  }

  async updateResume(id, payload) {
    const doc = await resumeRepository.updateById(id, payload);
    if (!doc) throw new AppError("Resume not found", 404);
    return doc;
  }

  async deleteResume(id) {
    const doc = await resumeRepository.deleteById(id);
    if (!doc) throw new AppError("Resume not found", 404);
    return true;
  }
}

export default new ResumeService();
