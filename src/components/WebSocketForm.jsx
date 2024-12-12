import React, { useState, useEffect } from "react";
// import "./WebSocketForm.scss";

const WebSocketForm = () => {
  const [keyword, setKeyword] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ws, setWs] = useState(null);

  const WS_URL = `ws://${process.env.REACT_APP_API_URL}/ws/generate`;

  useEffect(() => {
    const socket = new WebSocket(WS_URL);
    setWs(socket);

    socket.onopen = () => console.log("WebSocket接続成功");
    socket.onclose = (event) => {
      if (event.code === 1006) {
        setError("異常発生");
      } else if (event.code === 1011) {
        setError("サーバーで問題発生");
      }
    };
    socket.onerror = () => setError("WebSocketエラーが発生しました");

    return () => socket.close();
  }, [WS_URL]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setResponse("");
    setError("");
    setIsLoading(true);

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ keyword }));

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.answer) {
          setResponse(data.answer);
        } else if (data.error) {
          setError(data.error);
        }
        setIsLoading(false);
      };
    } else {
      setError("WebSocket接続が確立されていません");
      setIsLoading(false);
    }
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
      {response && <p>レスポンス: {response}</p>}
      {error && <p className="error">エラー: {error}</p>}
    </div>
  );
};

export default WebSocketForm;
