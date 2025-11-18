import interviewRepository from "../repositories/interview.repository.js";
import AppError from "../utils/AppError.js";

class InterviewService {
  getInterviews(query) {
    return interviewRepository.findAll(query, {});
  }

  async getInterviewById(id) {
    const doc = await interviewRepository.findById(id);
    if (!doc) throw new AppError("Interview not found", 404);
    return doc;
  }

  createInterview(payload) {
    return interviewRepository.create(payload);
  }

  async updateInterview(id, payload) {
    const doc = await interviewRepository.updateById(id, payload);
    if (!doc) throw new AppError("Interview not found", 404);
    return doc;
  }

  async deleteInterview(id) {
    const doc = await interviewRepository.deleteById(id);
    if (!doc) throw new AppError("Interview not found", 404);
    return true;
  }
}

export default new InterviewService();
