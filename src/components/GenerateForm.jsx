import React from "react";
import RestApiForm from "./RestApiForm.jsx";
import WebSocketForm from "./WebSocketForm.jsx";
import "./GenerateForm.scss";

const GeneratePage = ()  => {
  return (
    <div className="generate-page">
      <h1>豆知識生成ページ</h1>
      <div className="forms-container">
        <div className="form-section">
          <h2>REST API リクエスト</h2>
          <RestApiForm />
        </div>
        <div className="form-section">
          <h2>WebSocket リクエスト</h2>
          <WebSocketForm />
        </div>
      </div>
    </div>
  );
};

export default GeneratePage;