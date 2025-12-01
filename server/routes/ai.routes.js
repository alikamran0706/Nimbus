import express from "express";
import multer from "multer";
import resumeParserService from "../services/resumeParser.service.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/voice-to-text", upload.single("file"), async (req, res) => {
  try {
    const output = await resumeParserService.voiceToBlendShapes(req.file.path);

    // delete temp file
    import("fs").then(fs => fs.unlink(req.file.path, () => {}));

    return res.json({ success: true, output });
  } catch (error) {
    console.error("Backend AI Error:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message || "AI processing failed",
    });
  }
});

router.post("/generate/job", async (req, res) => {
  try {

    const {message, formData} = req.body

    console.log('messsss', message, formData)
    const output = await resumeParserService.generateJobPost(message, formData);

    return res.json({ success: true, ...output });
  } catch (error) {
    console.error("Backend AI Error:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message || "AI processing failed",
    });
  }
});

export default router;
