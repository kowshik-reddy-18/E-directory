import React, { useState } from 'react';
import './App.css';
import ResumeUploader from './components/ResumeUploader';
import ResumeDetails from './components/ResumeDetails';
import PastResumesTable from './components/PastResumesTable';

function App() {
  const [tab, setTab] = useState('analyze');
  const [analysis, setAnalysis] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalResume, setModalResume] = useState(null);

  // For modal details in history
  const handleSelectResume = async (id) => {
    setModalOpen(true);
    setModalResume(null);
    try {
      const res = await fetch(`/api/resumes/${id}`);
      const data = await res.json();
      setModalResume(data);
    } catch {
      setModalResume({ error: 'Failed to load details.' });
    }
  };

  return (
    <div className="App" style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h1>Resume Analyzer</h1>
      <div style={{ marginBottom: 24 }}>
        <button onClick={() => setTab('analyze')} disabled={tab === 'analyze'}>Resume Analysis</button>
        <button onClick={() => setTab('history')} disabled={tab === 'history'} style={{ marginLeft: 8 }}>Historical Viewer</button>
      </div>
      {tab === 'analyze' && (
        <>
          <ResumeUploader onAnalysisComplete={setAnalysis} />
          {analysis && (
            <div style={{ marginTop: 32 }}>
              <h2>Analysis Result</h2>
              <ResumeDetails resume={analysis} />
            </div>
          )}
        </>
      )}
      {tab === 'history' && (
        <PastResumesTable onSelectResume={handleSelectResume} />
      )}
      {/* Modal for details */}
      {modalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }} onClick={() => setModalOpen(false)}>
          <div style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 400, maxHeight: '80vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <button style={{ float: 'right' }} onClick={() => setModalOpen(false)}>Close</button>
            <h2>Resume Details</h2>
            {modalResume ? (
              modalResume.error ? <div style={{ color: 'red' }}>{modalResume.error}</div> : <ResumeDetails resume={modalResume} />
            ) : <div>Loading...</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
