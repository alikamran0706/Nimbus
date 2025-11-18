import mongoose, { Schema } from "mongoose"

const interviewSchema = new Schema(
  {
    sessionType: { type: String, enum: ["ai", "voice-ai", "human"] },
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    recruiter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    progress: Number,
    summary: String,
  },
  { timestamps: true }
);

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;
