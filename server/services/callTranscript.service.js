import callTranscriptRepository from "../repositories/callTranscript.repository.js";

class CallTranscriptService {
  getTranscripts(query) {
    return callTranscriptRepository.findAll(query, {});
  }

  createTranscript(payload) {
    return callTranscriptRepository.create(payload);
  }
}

export default new CallTranscriptService();
