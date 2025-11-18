// src/repositories/job.repository.js
import BaseRepository from "./base.repository.js";
import Job from "../models/job.model.js";

class JobRepository extends BaseRepository {
  constructor() {
    super(Job);
  }
}

export default new JobRepository();
