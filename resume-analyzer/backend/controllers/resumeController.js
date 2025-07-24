const pool = require('../db');
const { extractTextFromPDF, analyzeResumeWithLLM } = require('../services/analysisService');

// Upload and analyze resume
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;
    const pdfText = await extractTextFromPDF(fileBuffer);
    const analysis = await analyzeResumeWithLLM(pdfText);

    // Insert into DB
    const insertQuery = `
      INSERT INTO resumes (
        file_name, name, email, phone, linkedin_url, portfolio_url, summary,
        work_experience, education, technical_skills, soft_skills, projects, certifications,
        resume_rating, improvement_areas, upskill_suggestions
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
      RETURNING *;
    `;
    const values = [
      fileName,
      analysis.name,
      analysis.email,
      analysis.phone,
      analysis.linkedin_url,
      analysis.portfolio_url,
      analysis.summary,
      JSON.stringify(analysis.work_experience || []),
      JSON.stringify(analysis.education || []),
      JSON.stringify(analysis.technical_skills || []),
      JSON.stringify(analysis.soft_skills || []),
      JSON.stringify(analysis.projects || []),
      JSON.stringify(analysis.certifications || []),
      analysis.resume_rating,
      analysis.improvement_areas,
      JSON.stringify(analysis.upskill_suggestions || [])
    ];
    const { rows } = await pool.query(insertQuery, values);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all resumes
exports.getAllResumes = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, file_name, uploaded_at, name, email, phone, resume_rating FROM resumes ORDER BY uploaded_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get resume by ID
exports.getResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM resumes WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};