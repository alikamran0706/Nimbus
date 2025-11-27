import mongoose, { Schema } from "mongoose"

const jobSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    department: String,
    location: String,
    industry: String,
    department: String,
    notes: String,
    responsibilities: String,
    skills: [String],
    requirements: [String],
    channels: [String],
    jobBoards: [String],
    experience: Number,
    contract: Number,
    joiningDate: Date,
    expiryDate: Date,
    isDraft: {
      type: Boolean,
      deafault: false
    },
    type: { type: String, enum: ["remote", "onsite", "hybrid", "contract", "part-time"] },
    salaryRange: {
      min: Number,
      max: Number,
    },
    status: {
      type: String,
      enum: ["draft", "published", "closed"],
      default: "draft",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
