import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "candidate_resumes",
    resource_type: "raw", 
    allowed_formats: ["pdf", "doc", "docx", "txt", "csv"],
  },
});

export const resumeUpload = multer({
  storage: resumeStorage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB max
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