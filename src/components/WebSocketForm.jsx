import React, { useState } from "react";
import "./WebSocketForm.scss";

const WebSocketForm = () => {
  const [keyword, setKeyword] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const WS_URL = `ws://${process.env.REACT_APP_API_URL}/ws/generate`;

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    setResponse("");
    setError("");
    setIsLoading(true);

    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log("WebSocket接続成功");
      socket.send(JSON.stringify({ keyword }));
    };

    socket.onmessage = (event) => {
      console.log(event);
      const data = JSON.parse(event.data);
      if (data.answer) {
        setResponse(data.answer);
      } else if (data.error) {
        setError(data.error);
      }
      setIsLoading(false);
      socket.close();
    };

    socket.onerror = () => {
      setError("WebSocketエラーが発生しました");
      setIsLoading(false);
    };

    socket.onclose = (event) => {
      if (event.code === 1006) {
        setError("異常発生");
      } else if (event.code === 1011) {
        setError("サーバーで問題発生");
      }
      setIsLoading(false);
    };
  };

  return (
    <div className="websocket-form">
      <form onSubmit={handleSubmit}>
        <label>
          キーワード:
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            disabled={isLoading}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "生成中..." : "送信"}
        </button>
      </form>
      {response && <p>{response}</p>}
      {error && <p className="error">エラー: {error}</p>}
    </div>
  );
};

export default WebSocketForm;
