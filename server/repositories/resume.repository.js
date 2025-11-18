// resume.repository.js
import BaseRepository from "./base.repository.js";
import Resume from "../models/resume.model.js";

class ResumeRepository extends BaseRepository {
  constructor() {
    super(Resume);
  }
}

export default new ResumeRepository();
