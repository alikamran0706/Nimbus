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
  "firstName": "",
 "lastName": "",
 "email": "",
 "contactNo": "",
 "nationality": "",
 "industry": "",
 "dateOfBirth": "",
  "summary": string,
  "skills": string[],
  "education": [
  { "institution": "", "degree": "", "startDate": "", "endDate": "" }
  ],
  "experience": [
      { "company": "", "role": "", "startDate": "", "endDate": "", "isCurrent": false }
  ],
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
