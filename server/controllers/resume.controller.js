import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
import resumeParserService from "../services/resumeParser.service.js";
import Resume from "../models/resume.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import { extractDetails } from "../utils/parseResume.js";

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

export const parseResumeFile = async (req, res) => {
  try {
    const userId = req.user;
    const file = req.file;

    if (!file) return res.status(400).json({ message: "Please upload resume file" });

    let text = "";

    if (file.mimetype === "application/pdf") {
      const pdfData = new PDFParse(file.buffer);
      text = await pdfData.getText();
    } else if (file.mimetype.includes("word")) {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      text = result.value;
    } else {
      text = file.buffer.toString();
    }

    const extractedData = extractDetails(text);

    const savedResume = await Resume.findOneAndUpdate(
      { userId },
      {
        ...extractedData,
        textExtracted: text,
        referenceNo: `REF-${Date.now()}`,
        document: { url: "", isPrimary: true }
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Resume uploaded & parsed successfully",
      resume: savedResume,
    });

  } catch (error) {
    console.error("Resume parsing error:", error);
    res.status(500).json({ message: "Resume parsing failed", error });
  }
};