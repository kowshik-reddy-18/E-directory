# Resume Analyzer Backend

A Node.js backend service that analyzes PDF resumes using AI-powered text extraction and analysis.

## Features

- **PDF Text Extraction**: Uses `pdf2json` to extract text from PDF files
- **AI-Powered Analysis**: Leverages Google's Gemini AI to analyze and structure resume data
- **RESTful API**: Simple HTTP endpoints for resume upload and analysis
- **Structured Output**: Returns standardized JSON with resume details, ratings, and improvement suggestions

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Generative AI API key

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` and add your Google API key:
```
GOOGLE_API_KEY=your_actual_api_key_here
```

### Getting a Google API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env` file

## Usage

### Start the server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3001` by default.

### API Endpoints

#### Health Check
```
GET /health
```
Returns server status.

#### Analyze Resume
```
POST /analyze-resume
```
Upload and analyze a PDF resume.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: PDF file with field name `resume`

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-234-567-8900",
    "linkedin_url": "https://linkedin.com/in/johndoe",
    "portfolio_url": "https://johndoe.dev",
    "summary": "Experienced software developer...",
    "work_experience": [
      {
        "role": "Senior Developer",
        "company": "Tech Corp",
        "duration": "2020-2023",
        "description": ["Built scalable applications", "Led team of 5 developers"]
      }
    ],
    "education": [
      {
        "degree": "BS Computer Science",
        "institution": "University XYZ",
        "graduation_year": "2020"
      }
    ],
    "technical_skills": ["JavaScript", "React", "Node.js"],
    "soft_skills": ["Leadership", "Communication"],
    "projects": ["E-commerce platform", "Mobile app"],
    "certifications": ["AWS Certified Developer"],
    "resume_rating": 8,
    "improvement_areas": "Could add more quantifiable achievements",
    "upskill_suggestions": ["Cloud architecture", "DevOps practices"]
  },
  "metadata": {
    "originalFilename": "resume.pdf",
    "fileSize": 245760,
    "extractedTextLength": 2048,
    "processedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Example Usage with curl

```bash
curl -X POST \
  http://localhost:3001/analyze-resume \
  -H "Content-Type: multipart/form-data" \
  -F "resume=@path/to/your/resume.pdf"
```

## Error Handling

The service includes comprehensive error handling for:
- Invalid file types (only PDF allowed)
- File size limits (10MB max)
- Text extraction failures
- AI analysis errors
- Invalid JSON responses from AI

## Development

### Project Structure

```
backend/
├── services/
│   └── analysisService.js    # Core PDF and AI processing logic
├── server.js                 # Express server setup
├── package.json             # Dependencies and scripts
├── .env.example            # Environment variables template
└── README.md               # This file
```

### Testing

Run tests (when implemented):
```bash
npm test
```

## Limitations

- Only supports PDF files
- Requires readable text in PDFs (not scanned images)
- Depends on Google Gemini AI availability
- API rate limits apply based on your Google API key tier

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request