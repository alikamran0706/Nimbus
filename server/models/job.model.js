import mongoose, { Schema } from "mongoose"

const jobSchema = new Schema(
  {
    companyName: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    department: String,
    location: String,
    country: String,
    city: String,
    industry: String,
    department: String,
    notes: String,
    responsibilities: String,
    skills: [String],
    requirements: [String],
    channels: [String],
    jobBoards: [String],
    benefits: [String],
    experience: String,
    contract: String,
    joiningDate: Date,
    expiryDate: Date,
    isDraft: {
      type: Boolean,
      deafault: false
    },
    media: {
      versions: [
        {
          size: { type: String, enum: ["thumb", "small", "medium", "large"] },
          path: { type: String },
        },
      ],
      url: String,
      caption: String,
      isPrimary: { type: Boolean, default: false },
      uploadedAt: { type: Date, default: Date.now },
    },
    jobType: { type: String, enum: ["remote", "onsite", "hybrid", "contract", "part-time", "full-time"] },
    salaryRange: {
      min: Number,
      max: Number,
    },
    status: {
      type: String,
      enum: ["draft", "published", "closed"],
      default: "published",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  },
  { timestamps: true }
);

// Add virtual for applications
jobSchema.virtual("applications", {
  ref: "Application",
  localField: "_id",
  foreignField: "job"
});

// Virtual for applications count
jobSchema.virtual("applicationCount", {
  ref: "Application",
  localField: "_id",
  foreignField: "job",
  count: true
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
