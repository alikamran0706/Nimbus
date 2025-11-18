import mongoose, { Schema } from "mongoose"

const jobSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    department: String,
    location: String,
    type: { type: String, enum: ["remote", "onsite", "hybrid"] },
    salaryRange: {
      min: Number,
      max: Number,
    },
    status: {
      type: String,
      enum: ["draft", "published", "closed"],
      default: "draft",
    },
    requiredSkills: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
