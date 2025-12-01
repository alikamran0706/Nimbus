import OpenAI from "openai";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import fs from "fs";
import { InferenceClient } from "@huggingface/inference";

import dotenv from "dotenv";

dotenv.config();
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const openAIClient = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HUGGINGFACE_API_KEY,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class ResumeParserService {

  convertWebmToWav(input, output) {
    return new Promise((resolve, reject) => {
      ffmpeg(input)
        .toFormat("wav")
        .on("end", () => resolve(output))
        .on("error", reject)
        .save(output);
    });
  }

  // ---------------- RESUME TEXT PARSER ----------------
  async parse(text) {
    const prompt = `
    You are an AI resume parser. Extract structured information from the following resume text.

    Return JSON with this exact shape:
    {
      "firstName": "",
      "lastName": "",
      "email": "",
      "contactNo": "",
      "nationality": "",
      "industry": "",
      "dateOfBirth": "",
      "summary": "",
      "skills": [],
      "education": [
        { "institution": "", "degree": "", "startDate": "", "endDate": "" }
      ],
      "experience": [
        { "company": "", "role": "", "startDate": "", "endDate": "", "isCurrent": false }
      ]
    }

    Resume:
    ${text}
    `;

    const completion = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
      response_format: { type: "json_object" },
    });

    const content = completion.output[0].content[0].text;
    return JSON.parse(content);
  }

  // ---------------- VOICE TO TEXT (WHISPER AI) ----------------
  async voiceToText(filePath) {
    try {

      const wavPath = filePath + ".wav";
      await this.convertWebmToWav(filePath, wavPath);

      const buffer = fs.readFileSync(wavPath);

      const response = await openai.audio.transcriptions.create({
        file: fs.createReadStream(wavPath),
        model: "whisper-1",
        language: "en",
      });

      return response.text; // plain string
    } catch (error) {
      console.error("Whisper transcription error:", error);
      throw new Error("Failed to transcribe audio");
    }
  }

  // ---------------- VOICE TO Job Description ----------------
  async voiceToBlendShapes(filePath) {
    console.log("Input File:", filePath);

    const wavPath = filePath + ".wav";
    await this.convertWebmToWav(filePath, wavPath);

    const buffer = fs.readFileSync(wavPath);

    // Convert buffer to Blob
    const data = new Blob([buffer], { type: "audio/wav" });

    const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

    const output = await client.automaticSpeechRecognition({
      data,
      model: "openai/whisper-large-v3-turbo",
      provider: "hf-inference",
    });

    fs.unlinkSync(filePath);
    fs.unlinkSync(wavPath);

    console.log("AI Output:", output?.text);

    const text = output?.text?.toLowerCase() || "";
    console.log("Transcribed:", text);

    // STEP 2: Validate if message is related
    const allowedKeywords = [
      "write job description",
      "job description",
      "create job description",
      "generate job description"
    ];

    const isRelevant = allowedKeywords.some(keyword => text.includes(keyword));

    if (!isRelevant) {
      return {
        success: false,
        message: "I can only help you write job descriptions. Please ask something related to creating a job description."
      };
    }

    // Extract job role
    const prompt = `
    You are an AI specialized in writing job descriptions. Create a professional job description based on this request.
    Ensure output has no * or markdown formatting.
    Request: ${text}`

    if (prompt) {

      const chatCompletion = await openAIClient.chat.completions.create({
        model: "meta-llama/Meta-Llama-3-8B-Instruct:novita",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      // console.log(chatCompletion.choices[0].message);
      return chatCompletion.choices[0]?.message;
    }
    else {
      throw new Error("Failed to transcribe audio");
    }


  }

  // ---------------- AI Job Post ----------------
async generateJobPost(message, formData = {}) {
  try {
    const prompt = `
      You are an AI Job Posting Assistant that creates comprehensive job postings.

      CRITICAL INSTRUCTIONS:
      You MUST return ONLY a valid JSON object with this EXACT structure:
      {
        "success": boolean,
        "message": "string",
        "update": {
          "companyName": "string",
          "title": "string",
          "description": "string", 
          "department": "string",
          "location": "string",
          "notes": "string",
          "responsibilities": "string",
          "skills": ["array", "of", "strings"],
          "requirements": ["array", "of", "strings"],
          "channels": ["array", "of", "strings"],
          "jobBoards": ["array", "of", "strings"],
          "benefits": ["array", "of", "strings"],
          "experience": "string",
          "contract": "string",
          "joiningDate": "string",
          "expiryDate": "string",
          "jobType": "string",
          "salaryRange": {"min": number, "max": number}
        },
        "summary": "string"
      }

      DO NOT return JSON as a string inside the message field.

      IMPORTANT CONSTRAINTS:
      - jobType MUST be one of these exact values: "remote", "onsite", "hybrid", "contract", "part-time", "full-time"
      - If user mentions other job types, map them to these values (e.g., "work from home" → "remote", "office job" → "onsite", "flexible" → "hybrid")
      - joiningDate and expiryDate MUST be valid date strings in ISO 8601 format (YYYY-MM-DD) or empty string if not specified
      - Examples: "2024-12-31", "2024-06-15", "2025-01-01"
      - If user mentions relative dates like "immediate", "next month", "2 weeks from now", convert to specific date

      GOAL:
      Extract ALL job-related information from user messages and fill the job posting form completely. Make intelligent inferences for missing fields.

      REQUIRED INFERENCES:
      - Department: Infer from skills/title (e.g., "React Native" → "Mobile Development")
      - Skills: Always provide specific technical skills array
      - Salary: Provide reasonable industry-standard range for the location
      - Requirements: Include relevant educational and experience requirements
      - Benefits: Include standard benefits package
      - Experience: Specify appropriate years based on role
      - Job Type: Default to "full-time" if not specified
      - Contract: Default to "Permanent" if not specified

      SUMMARY FORMAT:
      "Job Title: [title], Company Name: [companyName] , Location: [location], Salary Range: [min] - [max], Skills: [skill1, skill2], Requirements: [req1, req2], Benefits: [benefit1, benefit2]"

      CURRENT FORM DATA:
      ${JSON.stringify(formData)}

      USER MESSAGE:
      ${message}

      FILL ALL FIELDS INTELLIGENTLY. DO NOT LEAVE EMPTY FIELDS.

      Return ONLY the JSON object, no additional text.
      `;

    const response = await openAIClient.chat.completions.create({
      model: "meta-llama/Meta-Llama-3-8B-Instruct:novita",
      messages: [{ role: "user", content: prompt }],
    });

    const raw = response.choices[0]?.message?.content?.trim();

    let json;
    try {
      json = JSON.parse(raw);
    } catch (err) {
      json = { success: false, message: raw, update: {}, summary: "" };
    }

    return json;

  } catch (err) {
    console.log("AI ERROR:", err);
    throw new Error("AI Processing Failed");
  }
}


}

export default new ResumeParserService();
