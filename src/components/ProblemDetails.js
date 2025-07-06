// src/components/ProblemDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { usePlatform } from '../context/PlatformContext';
import './ProblemDetails.css';

const ProblemDetails = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [customInput, setCustomInput] = useState('');
  const [output, setOutput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { markAsSolved } = usePlatform();

  // Fetch problem data
  useEffect(() => {
    async function fetchProblem() {
      try {
        const res = await axios.get(`http://localhost:5000/api/problems/${id}`);
        setProblem(res.data);
      } catch (err) {
        console.error('Failed to load problem:', err);
      }
    }
    fetchProblem();
  }, [id]);

  // Handle Run
  const handleRun = async () => {
    try {
      const inputToSend = customInput.trim() !== ''
        ? customInput
        : (problem.testCases.find(tc => !tc.isHidden)?.input || '');

      const res = await axios.post('http://localhost:5000/api/submit/run', {
        code,
        language,
        input: inputToSend
      });

      setOutput(res.data.output);
    } catch (err) {
      console.error('Run error:', err);
      setOutput('Error running code');
    }
  };

  // Handle Submit
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await axios.post('http://localhost:5000/api/submit', {
        code,
        language,
        problemId: id
      });

      setOutput(res.data.message);

      if (res.data.allPassed) {
        markAsSolved(id);
      }

    } catch (err) {
      console.error('Submit error:', err);
      setOutput(`Error submitting code: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!problem) return <div>Loading...</div>;

  return (
    <div className="problem-details-container">
      <h2>
        {problem.title} 
        <span style={{ fontSize: '14px', color: 'green' }}> ({problem.difficulty})</span>
      </h2>
      <p>{problem.description}</p>

      <h4>📝 Constraints</h4>
      <pre>{problem.constraints}</pre>

      <h4>📥 Input Format</h4>
      <pre>{problem.inputFormat}</pre>

      <h4>📤 Output Format</h4>
      <pre>{problem.outputFormat}</pre>

      <h4>🧪 Sample Test Cases</h4>
      {problem.testCases.filter(tc => !tc.isHidden).map((tc, idx) => (
        <div key={idx}>
          <b>Input:</b>
          <pre>{tc.input}</pre>
          <b>Expected Output:</b>
          <pre>{tc.expectedOutput}</pre>
        </div>
      ))}

      <div className="editor-section">
        <div>
          <label>Select Language:</label>
          <select value={language} onChange={e => setLanguage(e.target.value)}>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>

        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="Write your code here..."
          rows={15}
          cols={80}
        />

        <div>
          <label>Custom Input (optional):</label>
          <textarea
            value={customInput}
            onChange={e => setCustomInput(e.target.value)}
            rows={4}
            cols={80}
          />
        </div>

        <div className="button-group">
          <button onClick={handleRun}>Run</button>
          <button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        <div className="output-section">
          <h4>Output:</h4>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetails;
