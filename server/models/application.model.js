import mongoose, { Schema } from "mongoose"

const ApplicationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", index: true },
    job: { type: Schema.Types.ObjectId, ref: "Job", index: true },
    source: String,
    aiMatchScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    aiConfidence: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    aiAnalysis: {
      scoreBreakdown: {
        skills: { type: Number, default: 0 },
        experience: { type: Number, default: 0 },
        education: { type: Number, default: 0 },
        keywords: { type: Number, default: 0 },
        location: { type: Number, default: 0 },
        salary: { type: Number, default: 0 },
      },
      strengths: [String],
      weaknesses: [String],
      recommendations: [String],
      analysisDate: Date,
      modelVersion: String,
    },
    aiRank: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["applied", "reviewing", "shortlisted", "interview", "hired", "rejected"],
      default: "applied",
    },
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
