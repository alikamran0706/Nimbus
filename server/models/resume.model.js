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
    fileUrl: String,
    textExtracted: String,
    parsedSkills: [String],
    achievements: [String],
    education: [{ institution: String, degree: String, year: String }],
    experience: [{ company: String, role: String, years: Number }],
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
  },
  { timestamps: true },
)

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;
