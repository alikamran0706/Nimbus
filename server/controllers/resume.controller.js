// import { PDFParse } from "pdf-parse";
// import mammoth from "mammoth";
import resumeParserService from "../services/resumeParser.service.js";
import Resume from "../models/resume.model.js";
import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
// import { extractDetails } from "../utils/parseResume.js";
import resumeService from "../services/resume.service.js";
import {
  extractTextFromPDF,
  extractTextFromDoc,
  parseResumeText
} from "../utils/resumeParser.js";
import fs from 'fs';
import { promisify } from 'util';
import { v2 as cloudinary } from 'cloudinary';


const unlinkAsync = promisify(fs.unlink);

// Parse uploaded resume file (using temp storage)
export const parseResumeFile = async (req, res) => {
  console.log('=== parseResumeFile called ===');
  console.log('Request file:', req.file);
  console.log('Request user:', req.user);
  console.log('User ID:', req.user);

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    if (!req.user) {
      // Clean up temp file if user is not authenticated
      if (req.file.path && fs.existsSync(req.file.path)) {
        await unlinkAsync(req.file.path);
      }
      return res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
    }

    const tempFilePath = req.file.path;
    const fileType = req.file.mimetype;

    console.log('Processing file:', {
      originalname: req.file.originalname,
      path: tempFilePath,
      type: fileType,
      size: req.file.size
    });

    try {
      let extractedText = '';

      // Extract text from local file
      if (fileType === 'application/pdf') {
        extractedText = await extractTextFromPDF(tempFilePath);
      } else if (fileType.includes('msword') || fileType.includes('wordprocessingml')) {
        extractedText = await extractTextFromDoc(tempFilePath);
      } else if (fileType.includes('text/plain')) {
        extractedText = fs.readFileSync(tempFilePath, 'utf-8');
      } else {
        // Clean up temp file
        await unlinkAsync(tempFilePath);
        return res.status(400).json({
          success: false,
          message: 'Unsupported file format'
        });
      }

      console.log('Text extracted, length:', extractedText.length);

      // Parse the extracted text
      // const parsedData = await parseResumeText(extractedText);
      const parsedData = await resumeParserService.generateResume(extractedText);
      console.log('Parsed data:', parsedData);

      // Upload file to Cloudinary with proper user ID
      let cloudinaryResult;
      try {
        // Get user ID - check if req.user is a string or object
        let userId;
        if (typeof req.user === 'string') {
          userId = req.user;
        } else if (req.user && typeof req.user === 'object') {
          // Try common ID fields
          userId = req.user.id || req.user._id || req.user.userId || 'unknown';
        } else {
          userId = 'unknown';
        }

        console.log('Using userId:', userId);

        const publicId = `resume_${Date.now()}_${userId}`;
        console.log('Uploading to Cloudinary with public_id:', publicId);

        // UPLOAD AS AUTO OR IMAGE RESOURCE TYPE, NOT RAW
        cloudinaryResult = await cloudinary.uploader.upload(tempFilePath, {
          folder: 'candidate_resumes',
          resource_type: 'raw', // MUST be 'raw' for PDF
          public_id: publicId,
          overwrite: true,
          type: 'upload',
           pages: true,
          // Explicitly tell Cloudinary it's a PDF
          format: 'pdf',
        });

        console.log('Uploaded to Cloudinary:', cloudinaryResult.secure_url);
        console.log('Cloudinary resource type:', cloudinaryResult.resource_type);
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
      }

      // Check if resume already exists for this user
      let resume = await Resume.findOne({ userId: req.user });

      const resumeData = {
        userId: req.user,
        personalInfo: {
          firstName: parsedData.firstName || req.user.firstName || '',
          lastName: parsedData.lastName || req.user.lastName || '',
          email: parsedData.email || req.user.email || '',
          phone: parsedData.phone || '',
          dateOfBirth: parsedData.dateOfBirth || null,
          nationality: parsedData.nationality || '',
          linkedinUrl: parsedData.linkedinUrl || '',
        },
        professionalSummary: {
          title: parsedData.title || '',
          summary: parsedData.summary || '',
          yearsOfExperience: parsedData.yearsOfExperience || 0,
          careerLevel: parsedData.careerLevel || 'mid',
          desiredJobTitle: parsedData.desiredJobTitle || '',
          preferredWorkType: parsedData.preferredWorkType || 'hybrid',
          immediateAvailability: parsedData.immediateAvailability || false,
        },
        workExperience: parsedData.workExperience || [],
        education: parsedData.education || [],
        skills: {
          technical: parsedData.skills?.technical || [],
          soft: parsedData.skills?.soft || [],
        },
        certifications: parsedData.certifications || [],
        languages: parsedData.languages || [],
        documents: cloudinaryResult ? {
          resumeFile: {
            url: cloudinaryResult.secure_url,
            fileName: req.file.originalname,
            fileType: fileType,
            fileSize: req.file.size,
            uploadedAt: new Date(),
            isActive: true,
            cloudinaryPublicId: cloudinaryResult.public_id
          }
        } : {},
        parsedData: {
          rawText: extractedText.substring(0, 1000), // Store first 1000 chars
          structuredData: parsedData,
          parsingConfidence: 0.8,
          parsedAt: new Date(),
          parserVersion: '1.0'
        },
        metadata: {
          lastUpdated: new Date(),
          version: resume ? resume.metadata?.version + 1 : 1,
          completenessScore: calculateCompletenessScore(parsedData),
          aiOptimized: true,
          privacyLevel: 'private',
          keywords: extractKeywords(extractedText),
          totalExperienceYears: parsedData.yearsOfExperience || 0
        }
      };

      if (resume) {
        // Update existing resume
        resume = await Resume.findByIdAndUpdate(
          resume._id,
          { $set: resumeData },
          { new: true, runValidators: true }
        );
        console.log('Updated existing resume');
      } else {
        // Create new resume
        resume = await Resume.create(resumeData);
        console.log('Created new resume:', resume._id);

        // Update user reference
        await User.findByIdAndUpdate(req.user.id, {
          $set: { resume: resume._id }
        });
        console.log('Updated user resume reference');
      }

      // Clean up temp file
      try {
        await unlinkAsync(tempFilePath);
        console.log('Temp file cleaned up');
      } catch (cleanupError) {
        console.error('Temp file cleanup error:', cleanupError);
      }

      res.json({
        success: true,
        message: 'Resume parsed and uploaded successfully',
        data: {
          resume: resume,
          parsedData: parsedData,
          fileInfo: {
            name: req.file.originalname,
            size: req.file.size,
            type: fileType,
            uploadedAt: new Date(),
            cloudinaryUrl: cloudinaryResult?.secure_url || null
          }
        }
      });

    } catch (parseError) {
      console.error('Parsing error:', parseError);

      // Clean up temp file on error
      if (tempFilePath && fs.existsSync(tempFilePath)) {
        try {
          await unlinkAsync(tempFilePath);
        } catch (cleanupError) {
          console.error('Error cleaning up temp file:', cleanupError);
        }
      }

      res.status(500).json({
        success: false,
        message: 'Failed to parse resume file',
        error: parseError.message
      });
    }

  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during resume processing',
      error: error.message
    });
  }
};

export const uploadResumeToCloudinary = async (req, res) => {
  try {
    console.log('=== uploadResumeToCloudinary called ===');
    console.log('Request file:', req.file);
    console.log('Request user:', req.user);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    if (!req.user || !req.user) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
    }

    // Get Cloudinary URL from multer-storage-cloudinary
    const cloudinaryUrl = req.file.path;
    console.log('Cloudinary URL:', cloudinaryUrl);

    // Create or update resume record with just the file info
    let resume = await Resume.findOne({ userId: req.user });

    const resumeData = {
      userId: req.user,
      documents: {
        resumeFile: {
          url: cloudinaryUrl,
          fileName: req.file.originalname,
          fileType: req.file.mimetype,
          fileSize: req.file.size,
          uploadedAt: new Date(),
          isActive: true,
          cloudinaryPublicId: req.file.filename // Cloudinary stores filename as public_id
        }
      },
      metadata: {
        lastUpdated: new Date(),
        version: resume ? resume.metadata?.version + 1 : 1,
        completenessScore: 0,
        aiOptimized: false,
        privacyLevel: 'private'
      }
    };

    if (resume) {
      resume = await Resume.findByIdAndUpdate(
        resume._id,
        { $set: resumeData },
        { new: true, runValidators: true }
      );
    } else {
      resume = await Resume.create(resumeData);

      // Update user reference
      await User.findByIdAndUpdate(req.user.id, {
        $set: { resume: resume._id }
      });
    }

    res.json({
      success: true,
      message: 'Resume uploaded successfully to Cloudinary',
      data: {
        resume: resume,
        fileInfo: {
          name: req.file.originalname,
          size: req.file.size,
          type: req.file.mimetype,
          uploadedAt: new Date(),
          cloudinaryUrl: cloudinaryUrl
        }
      }
    });

  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload resume',
      error: error.message
    });
  }
};


// export const parseResumeText = asyncHandler(async (req, res) => {
//   const { id, text } = req.body; // id = resumeId, text = OCR or file text
//   if (!id || !text) throw new AppError("resume id and text are required", 400);

//   const parsed = await resumeParserService.parse(text);

//   const updated = await Resume.findByIdAndUpdate(
//     id,
//     {
//       textExtracted: text,
//       parsedSkills: parsed.skills,
//       education: parsed.education,
//       experience: parsed.experience,
//       summary: parsed.summary,
//     },
//     { new: true }
//   );

//   res.status(200).json({
//     status: "success",
//     data: updated,
//   });
// });

// export const parseResumeFile = async (req, res) => {
//   try {
//     const userId = req.user;
//     const file = req.file;

//     if (!file) return res.status(400).json({ message: "Please upload resume file" });

//     let text = "";

//     if (file.mimetype === "application/pdf") {
//       const pdfData = new PDFParse(file.buffer);
//       text = await pdfData.getText();
//     } else if (file.mimetype.includes("word")) {
//       const result = await mammoth.extractRawText({ buffer: file.buffer });
//       text = result.value;
//     } else {
//       text = file.buffer.toString();
//     }

//     const extractedData = extractDetails(text);

//     const savedResume = await Resume.findOneAndUpdate(
//       { userId },
//       {
//         ...extractedData,
//         textExtracted: text,
//         referenceNo: `REF-${Date.now()}`,
//         document: { url: "", isPrimary: true }
//       },
//       { upsert: true, new: true }
//     );

//     res.status(200).json({
//       message: "Resume uploaded & parsed successfully",
//       resume: savedResume,
//     });

//   } catch (error) {
//     console.error("Resume parsing error:", error);
//     res.status(500).json({ message: "Resume parsing failed", error });
//   }
// };


export const getResumes = asyncHandler(async (req, res) => {
  const result = await resumeService.getResumes(req.query);
  res.status(200).json({ status: "success", data: result.data, pagination: result.pagination });
});

export const getResume = asyncHandler(async (req, res) => {
  const item = await resumeService.getResumeById(req.params.id);
  if (!item) throw new AppError("Resume not found", 404);
  res.status(200).json({ status: "success", data: item });
});

// Create new resume (manual entry)
export const createResume = async (req, res) => {
  try {
    const resumeData = {
      userId: req.user,
      ...req.body,
      metadata: {
        lastUpdated: new Date(),
        version: 1,
        completenessScore: calculateCompletenessScore(req.body),
        aiOptimized: false,
        privacyLevel: 'private'
      }
    };

    const resume = await Resume.create(resumeData);

    // Update user reference
    await User.findByIdAndUpdate(req.user.id, {
      $set: { resume: resume._id }
    });

    res.status(201).json({
      success: true,
      message: 'Resume created successfully',
      data: resume
    });

  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create resume',
      error: error.message
    });
  }
};

export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    const updateData = {
      ...req.body,
      'metadata.lastUpdated': new Date(),
      'metadata.version': resume.metadata?.version + 1 || 2,
      'metadata.completenessScore': calculateCompletenessScore(req.body)
    };

    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Resume updated successfully',
      data: updatedResume
    });

  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update resume',
      error: error.message
    });
  }
};

// Delete resume
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // Delete file from Cloudinary if exists
    if (resume.documents?.resumeFile?.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(resume.documents.resumeFile.cloudinaryPublicId, {
          resource_type: 'raw'
        });
      } catch (cloudinaryError) {
        console.error('Cloudinary delete error:', cloudinaryError);
      }
    }

    await Resume.findByIdAndDelete(req.params.id);

    // Remove resume reference from user
    await User.findByIdAndUpdate(req.user.id, {
      $unset: { resume: "" }
    });

    res.json({
      success: true,
      message: 'Resume deleted successfully'
    });

  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete resume',
      error: error.message
    });
  }
};

// Download resume file
export const downloadResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!resume || !resume.documents?.resumeFile?.url) {
      return res.status(404).json({
        success: false,
        message: 'Resume file not found'
      });
    }

    // Redirect to Cloudinary URL for download
    res.redirect(resume.documents.resumeFile.url);

  } catch (error) {
    console.error('Download resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to download resume',
      error: error.message
    });
  }
};

const calculateCompletenessScore = (data) => {
  let score = 0;
  let totalFields = 0;

  // Personal Info (20%)
  if (data.personalInfo?.firstName) score += 5;
  if (data.personalInfo?.lastName) score += 5;
  if (data.personalInfo?.email) score += 5;
  if (data.personalInfo?.phone) score += 5;
  totalFields += 4;

  // Professional Summary (20%)
  if (data.professionalSummary?.title) score += 10;
  if (data.professionalSummary?.summary) score += 10;
  totalFields += 2;

  // Work Experience (30%)
  if (data.workExperience?.length > 0) {
    const expScore = Math.min(data.workExperience.length * 5, 30);
    score += expScore;
  }
  totalFields += 1;

  // Education (15%)
  if (data.education?.length > 0) {
    const eduScore = Math.min(data.education.length * 5, 15);
    score += eduScore;
  }
  totalFields += 1;

  // Skills (15%)
  if (data.skills?.technical?.length > 0 || data.skills?.soft?.length > 0) {
    const skillsCount = (data.skills.technical?.length || 0) + (data.skills.soft?.length || 0);
    const skillsScore = Math.min(skillsCount * 1, 15);
    score += skillsScore;
  }
  totalFields += 1;

  // Calculate percentage
  const maxScore = 100; // 100% total
  return Math.round((score / maxScore) * 100);
};

// Helper function to extract keywords from text
const extractKeywords = (text) => {
  const commonWords = new Set(['the', 'and', 'for', 'with', 'that', 'this', 'have', 'from', 'were']);
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.has(word));

  // Get unique keywords (limit to 20)
  return [...new Set(words)].slice(0, 20);
};