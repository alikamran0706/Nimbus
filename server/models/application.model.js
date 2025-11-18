import mongoose, { Schema } from "mongoose"

const ApplicationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    title: String,
    company: String,
    location: String,
    status: { type: String, default: "submitted" },
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
