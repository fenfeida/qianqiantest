import React, { useState } from 'react';
import axios from 'axios';

function DiagnosisForm() {
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/diagnosis', {
        symptoms: symptoms,
      });
      setDiagnosis(response.data.diagnosis);
      setError(null);
    } catch (err) {
      setError('出现错误，请重试。');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="diagnosis-form">
        <label htmlFor="symptoms">症状描述：</label>
        <textarea
          id="symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        ></textarea>
        <button type="submit">获取诊断结果</button>
      </form>
      {diagnosis && (
        <div className="diagnosis-result">
          <h2>诊断结果：</h2>
          <p>{diagnosis}</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default DiagnosisForm;
