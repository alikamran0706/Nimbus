import Application from "../models/application.model.js";
import jobRepository from "../repositories/job.repository.js";
import AppError from "../utils/AppError.js";

class JobService {
  // getJobs(query) {
  //   if (query.includeApplications === "true") {
  //     query.populate = "applications";
  //   }
  //   return jobRepository.findAll(query, {
  //     searchFields: ["title", "description", "location", "companyName", "skills"]
  //   });
  // }

  // async getJobById(id) {
  //   const doc = await jobRepository.findById(id);
  //   if (!doc) throw new AppError("Job not found", 404);
  //   return doc;
  // }


  async getJobs(query) {
    const searchFields = ["title", "description", "location", "companyName", "skills"];

    // First get jobs without applications
    const result = await jobRepository.findAll(query, {
      searchFields,
      populate: [
        { path: "user", select: "name email" },
        { path: "company", select: "name logo" }
      ]
    });

    // If applications are requested, fetch them separately
    if (query.includeApplications === "true") {
      const jobsWithApplications = await Promise.all(
        result.data.map(async (job) => {
          const applications = await Application.find({ job: job._id })
            .populate("user", "name email profile")
            .sort({ createdAt: -1 });

          return {
            ...job.toObject(),
            applications
          };
        })
      );

      return {
        data: jobsWithApplications,
        pagination: result.pagination
      };
    }

    return result;
  }

  async getJobById(id, options = {}) {
    const { includeApplications = false } = options;

    // Get job with basic population
    const job = await jobRepository.findById(id, [
      { path: "user", select: "name email" },
      { path: "company", select: "name logo industry website" }
    ]);

    if (!job) throw new AppError("Job not found", 404);

    // If applications are requested, fetch them separately
    if (includeApplications) {
      const applications = await Application.find({ job: id })
        .populate("user", "name email profile")
        .sort({ createdAt: -1 });

      return {
        ...job.toObject(),
        applications
      };
    }

    return job;
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
