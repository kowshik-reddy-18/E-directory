# Resume Analyzer

A full-stack web application for uploading, analyzing, and reviewing resumes using AI (Google Gemini) and PostgreSQL.

## Project Structure

```
resume-analyzer/
├── backend/
├── frontend/
├── sample_data/
├── screenshots/
└── README.md
```

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd resume-analyzer/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (see `.env` template in backend directory).
4. Set up PostgreSQL and run the following SQL to create the table:
   ```sql
   CREATE TABLE resumes (
       id SERIAL PRIMARY KEY,
       file_name VARCHAR(255) NOT NULL,
       uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
       name VARCHAR(255),
       email VARCHAR(255),
       phone VARCHAR(50),
       linkedin_url VARCHAR(255),
       portfolio_url VARCHAR(255),
       summary TEXT,
       work_experience JSONB,
       education JSONB,
       technical_skills JSONB,
       soft_skills JSONB,
       projects JSONB,
       certifications JSONB,
       resume_rating INTEGER,
       improvement_areas TEXT,
       upskill_suggestions JSONB
   );
   ```
5. Start the backend server:
   ```bash
   node server.js
   ```

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd resume-analyzer/frontend
   ```
2. Initialize React app (if not already):
   ```bash
   npx create-react-app .
   ```
3. Install axios:
   ```bash
   npm install axios
   ```
4. Start the frontend:
   ```bash
   npm start
   ```

## Usage

- Upload resumes via the Resume Analysis tab.
- View all previous uploads and their analysis in the Historical Viewer tab.

## Sample Data & Screenshots

- Place test PDFs in `sample_data/`.
- Place UI screenshots in `screenshots/`.

## Environment Variables

See `backend/.env` for required variables.

## References

- Node.js, Express.js, PostgreSQL, React, Google Gemini API, Multer, pdf-parse