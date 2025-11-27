import mongoose, { Schema } from "mongoose"

const ApplicationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", index: true },
    job: { type: Schema.Types.ObjectId, ref: "Job", index: true },
    candidate: [{ type: mongoose.Schema.Types.ObjectId, ref: "Candidate" }],
    title: String,
    company: String,
    location: String,
    status: { 
      type: String, 
      enum: ["applied", "reviewing", "shortlisted", "interview", "hired", "rejected"],
      default: "applied",
     },
    applicationDate: Date,
    lastUpdated: Date,
    description: String,
    requirements: [String],
    benefits: [String],
    timeline: [
      {
        label: String,
        date: Date,
        color: { type: String, default: "gray" },
      },
    ],
  },
  { timestamps: true },
)

const ApplicationModel = mongoose.model("Application", ApplicationSchema);

export default ApplicationModel;
