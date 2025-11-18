import mongoose, { Schema } from "mongoose"

const callTranscriptSchema = new Schema(
  {
    interview: { type: mongoose.Schema.Types.ObjectId, ref: "Interview" },
    transcript: String,
    aiSummary: String,
    sentiment: String,
  },
  { timestamps: true }
);

const CallTranscript = mongoose.model("CallTranscript", callTranscriptSchema);

export default CallTranscript;

