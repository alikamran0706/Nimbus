import mongoose, { Schema } from "mongoose"

const ResumeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", unique: true },
    referenceNo: String,
    firstName: String,
    lastName: String,
    email: String,
    contactNo: String,
    nationality: String,
    industry: String,
    dateOfBirth: String,
    textExtracted: String,
    parsedSkills: [String],
    achievements: [String],
    education: [{ institution: String, degree: String, startDate: String, endDate: String }],
    experience: [{ company: String, role: String, startDate: String, endDate: String, isCurrent: { type: Boolean, default: false },  }],
    summary: String,
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
    document: {
      url: String,
      caption: String,
      isPrimary: { type: Boolean, default: false },
      uploadedAt: { type: Date, default: Date.now },
    },
  },
  { timestamps: true },
)

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;
