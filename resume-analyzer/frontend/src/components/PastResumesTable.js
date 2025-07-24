import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PastResumesTable = ({ onSelectResume }) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResumes = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get('/api/resumes');
        setResumes(res.data);
      } catch (err) {
        setError('Failed to fetch resumes.');
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  if (loading) return <div>Loading past resumes...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (resumes.length === 0) return <div>No resumes found.</div>;

  return (
    <table border="1" cellPadding="8" style={{ width: '100%', marginTop: 16 }}>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Uploaded At</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Rating</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {resumes.map((resume) => (
          <tr key={resume.id}>
            <td>{resume.file_name}</td>
            <td>{new Date(resume.uploaded_at).toLocaleString()}</td>
            <td>{resume.name || 'N/A'}</td>
            <td>{resume.email || 'N/A'}</td>
            <td>{resume.phone || 'N/A'}</td>
            <td>{resume.resume_rating || 'N/A'}</td>
            <td>
              <button onClick={() => onSelectResume(resume.id)}>Details</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PastResumesTable;