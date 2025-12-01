import mongoose, { Schema } from "mongoose"

const candidateSchema = new Schema(
  {
    name: { type: String, required: true },
    email: String,
    phone: String,
    experience: String,
    currentPosition: String,
    location: String,
    country: String,
    city: String,
    skills: [String],
    resume: { type: mongoose.Schema.Types.ObjectId, ref: "Resume" },
    roleDescription: String,
    role: String,
    source: String,
    aiMatch: Number,
    status: String,
  },
  { timestamps: true }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;
