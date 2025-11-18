import mongoose, { Schema } from "mongoose"

const candidateSchema = new Schema(
  {
    name: { type: String, required: true },
    email: String,
    phone: String,
    experience: Number,
    currentPosition: String,
    location: String,
    skills: [String],
    resume: { type: mongoose.Schema.Types.ObjectId, ref: "Resume" },
    source: String,
  },
  { timestamps: true }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;
