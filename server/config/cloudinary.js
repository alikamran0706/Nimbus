import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import fs from 'fs';
import path from 'path';
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Temporary storage for parsing
export const tempStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(process.cwd(), 'uploads', 'temp');
    console.log('Destination directory:', uploadDir);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log('Created directory:', uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const safeFileName = file.originalname.replace(/[^\w.-]/g, '_');
    const finalFileName = `resume-${uniqueSuffix}-${safeFileName}`;
    console.log('Generated filename:', finalFileName);
    cb(null, finalFileName);
  }
});

// Cloudinary storage for final upload
export const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "candidate_resumes",
    resource_type: "raw", 
    allowed_formats: ["pdf", "doc", "docx", "txt", "csv"],
  },
});

// Temporary upload for parsing
export const tempUpload = multer({
  storage: tempStorage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    console.log('File filter checking:', file.originalname, file.mimetype);
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      console.log('File type accepted:', file.mimetype);
      cb(null, true);
    } else {
      console.log('File type rejected:', file.mimetype);
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.'));
    }
  }
});

export const debugFileUpload = (req, res, next) => {
  console.log('=== File Upload Debug ===');
  console.log('Request body:', req.body);
  console.log('Request file:', req.file);
  console.log('Request files:', req.files);
  console.log('=== End Debug ===');
  next();
};

// Final upload to Cloudinary
export const resumeUpload = multer({
  storage: resumeStorage,
  limits: { fileSize: 20 * 1024 * 1024 },
});

// For videos, create a separate storage config
export const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user_videos",
    resource_type: "video",
    allowed_formats: ["mp4", "mov", "webm", "avi", "mkv"],
  },
});

export const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user_avatars",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

export const avatarUpload = multer({ storage: imageStorage });
export const videoUpload = multer({
  storage: videoStorage,
  limits: { fileSize: 100 * 1024 * 1024 }, 
});

export default cloudinary;

export const mediaStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {

    const ext = file.originalname.split('.').pop(); // png
    const baseName = file.originalname
      .replace(/\.[^/.]+$/, "") // remove extension
      .replace(/\s+/g, "_")
      .replace(/[^\w.-]/g, ""); 

    return {
      folder: `media/${file.fieldname}`,
      resource_type: "auto",
      allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov", "webm", "avi", "mkv"],
      public_id: `${Date.now()}-${baseName}`, 
    };
  },
});

export const postMediaUpload = multer({
  storage: mediaStorage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB max
  },
});