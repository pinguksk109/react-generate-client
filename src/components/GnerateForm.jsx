import React, { useState } from "react";
import axios from "axios";

const GenerateForm = () => {
  const [keyword, setKeyword] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("");
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/generate", {
        keyword,
      });
      setResponse(res.data.answer);
    } catch (err) {
      setError(err.response?.data?.detail || "An error occurred");
    }
  };

  return (
    <div>
      <h1>Generate Keyword</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="keyword">Keyword:</label>
          <input
            type="text"
            id="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {response && <p>Response: {response}</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default GenerateForm;
