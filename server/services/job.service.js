import jobRepository from "../repositories/job.repository.js";
import AppError from "../utils/AppError.js";

class JobService {
  getJobs(query) {
    return jobRepository.findAll(query, {
      searchFields: ["title", "description", "location"],
    });
  }

  async getJobById(id) {
    const doc = await jobRepository.findById(id);
    if (!doc) throw new AppError("Job not found", 404);
    return doc;
  }

  createJob(payload) {
    return jobRepository.create(payload);
  }

  async updateJob(id, payload) {
    const doc = await jobRepository.updateById(id, payload);
    if (!doc) throw new AppError("Job not found", 404);
    return doc;
  }

  async deleteJob(id) {
    const doc = await jobRepository.deleteById(id);
    if (!doc) throw new AppError("Job not found", 404);
    return true;
  }

  createJobsBulk(list) {
    return jobRepository.bulkCreate(list);
  }

  updateJobsBulk(filter = {}, update = {}) {
    return jobRepository.bulkUpdate(filter, update);
  }

  deleteJobsBulk(filter = {}) {
    return jobRepository.bulkDelete(filter);
  }
}

export default new JobService();
