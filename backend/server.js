const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { extractText, analyzeResume } = require('./services/analysisService');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Resume Analyzer Service is running' });
});

// Resume analysis endpoint
app.post('/analyze-resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        error: 'No file uploaded',
        message: 'Please upload a PDF file' 
      });
    }

    console.log(`Processing resume: ${req.file.originalname}`);
    
    // Step 1: Extract text from PDF
    const extractedText = await extractText(req.file.buffer);
    
    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Text extraction failed',
        message: 'Could not extract text from the PDF. Please ensure the PDF contains readable text.' 
      });
    }

    console.log('Text extracted successfully, length:', extractedText.length);
    
    // Step 2: Analyze with Gemini AI
    const analysis = await analyzeResume(extractedText);
    
    console.log('Analysis completed successfully');
    
    res.json({
      success: true,
      data: analysis,
      metadata: {
        originalFilename: req.file.originalname,
        fileSize: req.file.size,
        extractedTextLength: extractedText.length,
        processedAt: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Error processing resume:', error);
    
    res.status(500).json({
      error: 'Analysis failed',
      message: error.message || 'An unexpected error occurred during resume analysis',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File too large',
        message: 'File size must be less than 10MB'
      });
    }
  }
  
  res.status(500).json({
    error: 'Server error',
    message: error.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: 'The requested endpoint does not exist'
  });
});

app.listen(PORT, () => {
  console.log(`Resume Analyzer Backend running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Upload endpoint: http://localhost:${PORT}/analyze-resume`);
});