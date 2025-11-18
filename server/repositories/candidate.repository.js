// candidate.repository.js
import BaseRepository from "./base.repository.js";
import Candidate from "../models/candidate.model.js";

class CandidateRepository extends BaseRepository {
  constructor() {
    super(Candidate);
  }
}

export default new CandidateRepository();
