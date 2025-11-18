import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class ResumeParserService {
  async parse(text) {
    const prompt = `
You are an AI resume parser. Extract structured information from the following resume text.

Return JSON with this shape:
{
  "summary": string,
  "skills": string[],
  "experience": [{ "company": string, "role": string, "years": number }],
  "education": [{ "institution": string, "degree": string, "year": string }]
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
}

export default new ResumeParserService();
