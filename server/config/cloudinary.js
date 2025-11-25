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
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB max
});

export default cloudinary;

// ... Upload Posts Data ...
// export const petMediaStorage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     return {
//       folder: "pet_media",
//       resource_type: "auto", // dynamically handles image/video
//       allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov", "webm", "avi", "mkv"],
//       public_id: `${Date.now()}-${file.originalname}`, // optional: unique file name
//     };
//   },
// });

export const petMediaStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const cleanName = file.originalname
      .replace(/\s+/g, "_")
      .replace(/[^\w.-]/g, ""); // remove unsafe characters

    return {
      folder: `pet_media/${file.fieldname}`, // Optional: organize by field name
      resource_type: "auto",
      allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov", "webm", "avi", "mkv"],
      public_id: `${Date.now()}-${cleanName}`,
    };
  },
});

export const postMediaUpload = multer({
  storage: petMediaStorage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB max
  },
});