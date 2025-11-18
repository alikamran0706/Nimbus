// interview.repository.js
import BaseRepository from "./base.repository.js";
import Interview from "../models/interview.model.js";

class InterviewRepository extends BaseRepository {
  constructor() {
    super(Interview);
  }
}

export default new InterviewRepository();
