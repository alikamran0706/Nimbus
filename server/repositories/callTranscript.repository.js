// callTranscript.repository.js
import BaseRepository from "./base.repository.js";
import CallTranscript from "../models/callTranscript.model.js";

class CallTranscriptRepository extends BaseRepository {
  constructor() {
    super(CallTranscript);
  }
}

export default new CallTranscriptRepository();
