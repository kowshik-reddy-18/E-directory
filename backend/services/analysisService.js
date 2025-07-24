const PDFParser = require("pdf2json");
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Validate API key is present
if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY environment variable is required");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Step 1: Extract text from PDF using pdf2json
const extractText = async (pdfBuffer) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", err => reject(err.parserError));
    pdfParser.on("pdfParser_dataReady", pdfData => {
      try {
        // Improved error handling for different PDF structures
        if (!pdfData || !pdfData.formImage || !pdfData.formImage.Pages) {
          throw new Error("Invalid PDF structure - no pages found");
        }

        const text = pdfData.formImage.Pages.map(page => {
          // Handle case where page might not have Texts array
          if (!page.Texts || !Array.isArray(page.Texts)) {
            return "";
          }
          
          return page.Texts.map(textItem => {
            // Handle case where textItem might not have R array
            if (!textItem.R || !Array.isArray(textItem.R) || textItem.R.length === 0) {
              return "";
            }
            
            // Handle case where R[0] might not have T property
            if (!textItem.R[0] || !textItem.R[0].T) {
              return "";
            }
            
            return decodeURIComponent(textItem.R[0].T.replace(/\+/g, ' '));
          }).join(" ");
        }).join("\n");

        // Check if we extracted any meaningful text
        if (!text || text.trim().length === 0) {
          throw new Error("No text could be extracted from PDF");
        }

        resolve(text);
      } catch (err) {
        reject(new Error(`PDF text extraction failed: ${err.message}`));
      }
    });

    // Add timeout to prevent hanging
    const timeout = setTimeout(() => {
      reject(new Error("PDF parsing timed out after 30 seconds"));
    }, 30000);

    pdfParser.on("pdfParser_dataReady", () => {
      clearTimeout(timeout);
    });

    pdfParser.on("pdfParser_dataError", () => {
      clearTimeout(timeout);
    });

    pdfParser.parseBuffer(pdfBuffer);
  });
};

// Step 2: Analyze resume text using Gemini
const analyzeResume = async (resumeText) => {
  // Validate input
  if (!resumeText || typeof resumeText !== 'string' || resumeText.trim().length === 0) {
    throw new Error("Resume text is required and must be a non-empty string");
  }

  // Truncate if text is too long (Gemini has token limits)
  const maxLength = 30000; // Approximate safe limit
  const truncatedText = resumeText.length > maxLength 
    ? resumeText.substring(0, maxLength) + "...[truncated]"
    : resumeText;

  const prompt = `
You are an expert technical recruiter and career coach. Analyze the following resume text and extract the information into a valid JSON object. The JSON object must conform to the following structure, and all fields must be populated. Do not include any text or markdown formatting before or after the JSON object.

Resume Text:
"""
${truncatedText}
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

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response text (remove potential markdown formatting)
    const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const parsedResult = JSON.parse(cleanText);
    
    // Validate the parsed result has required structure
    if (!parsedResult || typeof parsedResult !== 'object') {
      throw new Error("Invalid response structure from AI");
    }

    return parsedResult;
  } catch (err) {
    if (err instanceof SyntaxError) {
      console.error("Gemini response was not valid JSON:", err.message);
      throw new Error("Failed to parse AI response as JSON");
    }
    console.error("AI analysis error:", err.message);
    throw new Error(`AI analysis failed: ${err.message}`);
  }
};

module.exports = { extractText, analyzeResume };