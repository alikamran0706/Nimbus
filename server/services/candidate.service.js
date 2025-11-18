import candidateRepository from "../repositories/candidate.repository.js";
import AppError from "../utils/AppError.js";

class CandidateService {
  getCandidates(query) {
    return candidateRepository.findAll(query, {
      searchFields: ["name", "email", "location", "skills"],
    });
  }

  async getCandidateById(id) {
    const doc = await candidateRepository.findById(id);
    if (!doc) throw new AppError("Candidate not found", 404);
    return doc;
  }

  createCandidate(payload) {
    return candidateRepository.create(payload);
  }

  async updateCandidate(id, payload) {
    const doc = await candidateRepository.updateById(id, payload);
    if (!doc) throw new AppError("Candidate not found", 404);
    return doc;
  }

  async deleteCandidate(id) {
    const doc = await candidateRepository.deleteById(id);
    if (!doc) throw new AppError("Candidate not found", 404);
    return true;
  }

  createCandidatesBulk(list) {
    return candidateRepository.bulkCreate(list);
  }
}

export default new CandidateService();
