import React from 'react';

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '1.5rem' }}>
    <h3>{title}</h3>
    <div>{children}</div>
  </div>
);

const ResumeDetails = ({ resume }) => {
  if (!resume) return <div>No analysis to display.</div>;
  return (
    <div style={{ padding: 16 }}>
      <h2>{resume.name || 'Name not found'}</h2>
      <div>Email: {resume.email || 'N/A'}</div>
      <div>Phone: {resume.phone || 'N/A'}</div>
      <div>LinkedIn: {resume.linkedin_url || 'N/A'}</div>
      <div>Portfolio: {resume.portfolio_url || 'N/A'}</div>
      <Section title="Summary">{resume.summary || 'N/A'}</Section>
      <Section title="Work Experience">
        {(resume.work_experience && resume.work_experience.length > 0) ? (
          <ul>
            {resume.work_experience.map((exp, i) => (
              <li key={i}>
                <b>{exp.role}</b> at <b>{exp.company}</b> ({exp.duration})<br />
                <ul>
                  {exp.description && exp.description.map((d, j) => <li key={j}>{d}</li>)}
                </ul>
              </li>
            ))}
          </ul>
        ) : 'N/A'}
      </Section>
      <Section title="Education">
        {(resume.education && resume.education.length > 0) ? (
          <ul>
            {resume.education.map((edu, i) => (
              <li key={i}>
                <b>{edu.degree}</b> at <b>{edu.institution}</b> ({edu.graduation_year})
              </li>
            ))}
          </ul>
        ) : 'N/A'}
      </Section>
      <Section title="Technical Skills">
        {(resume.technical_skills && resume.technical_skills.length > 0) ? resume.technical_skills.join(', ') : 'N/A'}
      </Section>
      <Section title="Soft Skills">
        {(resume.soft_skills && resume.soft_skills.length > 0) ? resume.soft_skills.join(', ') : 'N/A'}
      </Section>
      <Section title="Projects">
        {(resume.projects && resume.projects.length > 0) ? (
          <ul>
            {resume.projects.map((proj, i) => (
              <li key={i}>{JSON.stringify(proj)}</li>
            ))}
          </ul>
        ) : 'N/A'}
      </Section>
      <Section title="Certifications">
        {(resume.certifications && resume.certifications.length > 0) ? (
          <ul>
            {resume.certifications.map((cert, i) => (
              <li key={i}>{JSON.stringify(cert)}</li>
            ))}
          </ul>
        ) : 'N/A'}
      </Section>
      <Section title="Resume Rating">
        {resume.resume_rating ? `${resume.resume_rating}/10` : 'N/A'}
      </Section>
      <Section title="Improvement Areas">
        {resume.improvement_areas || 'N/A'}
      </Section>
      <Section title="Upskill Suggestions">
        {(resume.upskill_suggestions && resume.upskill_suggestions.length > 0) ? resume.upskill_suggestions.join(', ') : 'N/A'}
      </Section>
    </div>
  );
};

export default ResumeDetails;