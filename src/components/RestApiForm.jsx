import React, { useState } from "react";
import axios from "axios";
import "./RestApiForm.scss"

const RestApiForm = () => {
  const [keyword, setKeyword] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("");
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post(`http://${API_URL}/generate`, {
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
    <div className="rest-api-form">
      <form onSubmit={handleSubmit}>
        <label>
          キーワード:
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            disable={isLoading}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "生成中..." : "送信"}
        </button>
      </form>
      {response && <p>レスポンス: {response}</p>}
      {error && <p className="error">エラー: {error}</p>}
    </div>
  );
};

export default RestApiForm;