import mongoose, { Schema } from "mongoose"

const ApplicationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", index: true },
    job: { type: Schema.Types.ObjectId, ref: "Job", index: true },
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
