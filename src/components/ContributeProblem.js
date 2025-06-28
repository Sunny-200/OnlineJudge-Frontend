import React, { useState } from 'react';
import axios from 'axios';
import './ContributeProblem.css'; // style as needed

const ContributeProblem = () => {
  const [formData, setFormData] = useState({
    title: '',
    tags: '',
    description: '',
    difficulty: 'Easy',
    constraints: '',
    inputFormat: '',
    outputFormat: '',
    testCases: [
      { input: '', expectedOutput: '', isHidden: false }
    ]
  });

  const handleChange = (e, index, field) => {
    if (field !== undefined) {
      const updatedTestCases = [...formData.testCases];
      if (field === 'isHidden') {
        updatedTestCases[index][field] = e.target.value === 'true';
      } else {
        updatedTestCases[index][field] = e.target.value;
      }
      setFormData({ ...formData, testCases: updatedTestCases });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const addTestCase = () => {
    setFormData({
      ...formData,
      testCases: [...formData.testCases, { input: '', expectedOutput: '', isHidden: false }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('⚠️ Please login first!');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/problems/create',
        {
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim())
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('✅ Problem submitted successfully!');
      setFormData({
        title: '',
        tags: '',
        description: '',
        difficulty: 'Easy',
        constraints: '',
        inputFormat: '',
        outputFormat: '',
        testCases: [{ input: '', expectedOutput: '', isHidden: false }]
      });
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Submission failed.';
      alert(`❌ ${errorMessage}`);
      console.error(err);
    }
  };

  return (
    <div className="contribute-container">
      <h2 className="form-title">📤 Contribute a New Problem</h2>

      <form onSubmit={handleSubmit} className="problem-form">
        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter problem title"
          />
        </div>

        <div className="form-group">
          <label>Tags (comma separated)</label>
          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g. array, dp"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Write the problem description here..."
          />
        </div>

        <div className="form-group">
          <label>Difficulty</label>
          <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label>Constraints</label>
          <textarea
            name="constraints"
            value={formData.constraints}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label>Input Format</label>
          <textarea
            name="inputFormat"
            value={formData.inputFormat}
            onChange={handleChange}
            rows={2}
          />
        </div>

        <div className="form-group">
          <label>Output Format</label>
          <textarea
            name="outputFormat"
            value={formData.outputFormat}
            onChange={handleChange}
            rows={2}
          />
        </div>

        <div className="test-cases-section">
          <h3>🧪 Test Cases</h3>
          {formData.testCases.map((tc, index) => (
            <div key={index} className="testcase-box">
              <div className="form-group">
                <label>Input</label>
                <textarea
                  value={tc.input}
                  onChange={(e) => handleChange(e, index, 'input')}
                  rows={2}
                />
              </div>
              <div className="form-group">
                <label>Expected Output</label>
                <textarea
                  value={tc.expectedOutput}
                  onChange={(e) => handleChange(e, index, 'expectedOutput')}
                  rows={2}
                />
              </div>
              <div className="form-group">
                <label>Visibility</label>
                <select
                  value={tc.isHidden}
                  onChange={(e) => handleChange(e, index, 'isHidden')}
                >
                  <option value={false}>Visible</option>
                  <option value={true}>Hidden</option>
                </select>
              </div>
            </div>
          ))}
          <button type="button" className="add-btn" onClick={addTestCase}>
            ➕ Add Another Test Case
          </button>
        </div>

        <button type="submit" className="submit-btn">
          🚀 Submit Problem
        </button>
      </form>
    </div>
  );
};

export default ContributeProblem;
