import mongoose, { Schema } from "mongoose"

const EducationSchema = new Schema({
  institution: { type: String },
  degree: { type: String },
  fieldOfStudy: String,
  grade: String,
  startDate: Date,
  endDate: Date,
  isCurrent: { type: Boolean, default: false },
  description: String,
  achievements: [String],
  location: String
});

const ExperienceSchema = new Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  employmentType: { 
    type: String, 
    enum: ["full-time", "part-time", "contract", "internship", "freelance", "self-employed"]
  },
  industry: String,
  location: String,
  startDate: Date,
  endDate: Date,
  isCurrent: { type: Boolean, default: false },
  description: String,
  achievements: [String],
  skillsUsed: [String],
  supervisor: String,
  reasonForLeaving: String
});

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  role: String,
  technologies: [String],
  startDate: Date,
  endDate: Date,
  url: String,
  isCurrent: { type: Boolean, default: false }
});

const CertificationSchema = new Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  issueDate: Date,
  expiryDate: Date,
  credentialId: String,
  credentialUrl: String,
  doesNotExpire: { type: Boolean, default: false }
});

const LanguageSchema = new Schema({
  language: { type: String, required: true },
  proficiency: { 
    type: String, 
    enum: ["native", "fluent", "professional", "intermediate", "basic"],
    default: "professional"
  }
});

const ResumeSchema = new Schema(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      unique: true, 
      required: true 
    },
    
    // Personal Information
    personalInfo: {
      firstName: String,
      lastName: String,
      email: { type: String, lowercase: true },
      phone: String,
      alternatePhone: String,
      dateOfBirth: Date,
      nationality: String,
      visaStatus: String,
      drivingLicense: Boolean,
      passportNumber: String,
      linkedinUrl: String,
      portfolioUrl: String,
      githubUrl: String,
      address: {
        street: String,
        city: String,
        state: String,
        country: String,
        postalCode: String
      },
      preferredContactMethod: {
        type: String,
        enum: ["email", "phone", "whatsapp", "linkedin"],
        default: "email"
      }
    },
    
    // Professional Summary
    professionalSummary: {
      title: String,
      summary: String,
      yearsOfExperience: Number,
      careerLevel: {
        type: String,
        enum: ["entry", "junior", "mid", "senior", "lead", "executive"]
      },
      desiredJobTitle: String,
      targetSalary: {
        amount: Number,
        currency: { type: String, default: "USD" },
        period: { type: String, enum: ["hourly", "monthly", "yearly"], default: "yearly" }
      },
      preferredWorkType: {
        type: String,
        enum: ["on-site", "remote", "hybrid", "flexible"],
        default: "hybrid"
      },
      preferredLocations: [String],
      immediateAvailability: { type: Boolean, default: false },
      noticePeriod: { type: Number, default: 30 } // days
    },
    
    // Skills & Competencies
    skills: {
      technical: [String],
      soft: [String],
      tools: [String],
      methodologies: [String]
    },
    
    // Experience & Education
    workExperience: [ExperienceSchema],
    education: [EducationSchema],
    projects: [ProjectSchema],
    certifications: [CertificationSchema],
    languages: [LanguageSchema],
    
    // Additional Sections
    awards: [{
      title: String,
      issuer: String,
      date: Date,
      description: String
    }],
    publications: [{
      title: String,
      publisher: String,
      date: Date,
      url: String,
      description: String
    }],
    volunteerWork: [{
      organization: String,
      role: String,
      startDate: Date,
      endDate: Date,
      description: String,
      hoursPerWeek: Number
    }],
    professionalMemberships: [{
      organization: String,
      membershipId: String,
      startDate: Date,
      endDate: Date,
      current: Boolean
    }],
    
    // Resume Metadata
    metadata: {
      lastUpdated: { type: Date, default: Date.now },
      version: { type: Number, default: 1 },
      completenessScore: { type: Number, min: 0, max: 100, default: 0 },
      aiOptimized: { type: Boolean, default: false },
      privacyLevel: {
        type: String,
        enum: ["public", "private", "confidential"],
        default: "private"
      },
      keywords: [String],
      industries: [String],
      jobTitles: [String],
      totalExperienceYears: Number
    },
    
    // Files & Media
    documents: {
      resumeFile: {
        url: String,
        fileName: String,
        fileType: String,
        fileSize: Number,
        uploadedAt: Date,
        isActive: { type: Boolean, default: true }
      },
      coverLetter: {
        url: String,
        fileName: String,
        uploadedAt: Date
      },
      portfolio: {
        url: String,
        description: String
      }
    },
    
    // Parsed Data
    parsedData: {
      rawText: String,
      structuredData: Schema.Types.Mixed,
      parsingConfidence: Number,
      parsedAt: Date,
      parserVersion: String
    },
    
    // Job Preferences
    jobPreferences: {
      desiredRoles: [String],
      industries: [String],
      companySize: {
        type: String,
        enum: ["startup", "small", "medium", "large", "enterprise"]
      },
      companyType: {
        type: String,
        enum: ["private", "public", "non-profit", "government", "startup"]
      },
      relocationWillingness: Boolean,
      travelPercentage: { type: Number, min: 0, max: 100, default: 0 }
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtuals
ResumeSchema.virtual('fullName').get(function() {
  return `${this.personalInfo?.firstName || ''} ${this.personalInfo?.lastName || ''}`.trim();
});

ResumeSchema.virtual('currentPosition').get(function() {
  const currentExp = this.workExperience?.find(exp => exp.isCurrent);
  return currentExp ? `${currentExp.position} at ${currentExp.company}` : null;
});

ResumeSchema.virtual('highestEducation').get(function() {
  if (!this.education?.length) return null;
  const sorted = [...this.education].sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
  return sorted[0];
});

// REMOVE THE DUPLICATE INDEX - keep only explicit indexes below
// ResumeSchema.index({ userId: 1 }); // REMOVE THIS LINE as userId already has unique: true

// Indexes - Only define indexes that aren't already defined inline
ResumeSchema.index({ "metadata.keywords": 1 });
ResumeSchema.index({ "personalInfo.location": 1 });
ResumeSchema.index({ "metadata.completenessScore": -1 });
ResumeSchema.index({ "metadata.totalExperienceYears": -1 });
ResumeSchema.index({ "metadata.lastUpdated": -1 });

// Compound indexes for better query performance
ResumeSchema.index({ 
  "personalInfo.location": 1,
  "professionalSummary.preferredWorkType": 1,
  "metadata.totalExperienceYears": -1 
});

ResumeSchema.index({ 
  "skills.technical.skills": 1,
  "professionalSummary.yearsOfExperience": -1 
});

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;