import resumeParserService from "../services/resumeParser.service.js";
import Resume from "../models/resume.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

// you already had uploadResumeAndCreate

export const parseResumeText = asyncHandler(async (req, res) => {
  const { id, text } = req.body; // id = resumeId, text = OCR or file text
  if (!id || !text) throw new AppError("resume id and text are required", 400);

  const parsed = await resumeParserService.parse(text);

  const updated = await Resume.findByIdAndUpdate(
    id,
    {
      textExtracted: text,
      parsedSkills: parsed.skills,
      education: parsed.education,
      experience: parsed.experience,
      summary: parsed.summary,
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: updated,
  });
});
