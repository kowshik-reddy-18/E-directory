const PDFParser = require("pdf2json");
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Step 1: Extract text from PDF using pdf2json
const extractText = async (pdfBuffer) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", err => reject(err.parserError));
    pdfParser.on("pdfParser_dataReady", pdfData => {
      try {
        const text = pdfData?.formImage?.Pages.map(page =>
          page.Texts.map(t =>
            decodeURIComponent(t.R[0].T.replace(/\+/g, ' '))
          ).join(" ")
        ).join("\n");
        resolve(text);
      } catch (err) {
        reject(err);
      }
    });

    pdfParser.parseBuffer(pdfBuffer);
  });
};

// Step 2: Analyze resume text using Gemini
const analyzeResume = async (resumeText) => {
  const prompt = `
You are an expert technical recruiter and career coach. Analyze the following resume text and extract the information into a valid JSON object. The JSON object must conform to the following structure, and all fields must be populated. Do not include any text or markdown formatting before or after the JSON object.

Resume Text:
"""
${resumeText}
"""

JSON Structure:
{
  "name": "string | null",
  "email": "string | null",
  "phone": "string | null",
  "linkedin_url": "string | null",
  "portfolio_url": "string | null",
  "summary": "string | null",
  "work_experience": [{ "role": "string", "company": "string", "duration": "string", "description": ["string"] }],
  "education": [{ "degree": "string", "institution": "string", "graduation_year": "string" }],
  "technical_skills": ["string"],
  "soft_skills": ["string"],
  "projects": ["string"],
  "certifications": ["string"],
  "resume_rating": "number (1-10)",
  "improvement_areas": "string",
  "upskill_suggestions": ["string"]
}
`;

  const model = genAI.getGenerativeModel({ model: 'models/gemini-pro' });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini response was not valid JSON:", text);
    throw new Error("Failed to parse Gemini response");
  }
};

module.exports = { extractText, analyzeResume };