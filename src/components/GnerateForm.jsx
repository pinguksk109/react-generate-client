import React, { useState } from "react";
import axios from "axios";
import "./GenerateForm.scss";

const GenerateForm = () => {
  const [keyword, setKeyword] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("");
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/generate", {
        keyword,
      });
      setResponse(res.data.answer);
    } catch (err) {
      setError(err.response?.data?.detail || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="generate-form">
      <h1>豆知識生成</h1>
      {isLoading && <p className="loading-message">回答を生成中です...</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="keyword">Keyword:</label>
          <input
            type="text"
            id="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "生成中..." : "Submit"}
        </button>
      </form>
      {response && (
        <div className="response-box">
          <p>{response}</p>
        </div>
      )}
      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
};

export default GenerateForm;