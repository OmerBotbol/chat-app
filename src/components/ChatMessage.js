import React from "react";
import "../style/ChatMessage.css";

function ChatMessage({ data, userId }) {
  return (
    <div className={userId === data.userId ? "left bubble" : "bubble"}>
      <div className={userId === data.userId ? "my message" : "message"}>
        <div className="userName">{data.userName}</div>
        <div className="content">{data.content}</div>
        <div className="time">
          {new Date(data.createdAt.seconds * 1000).toTimeString().slice(0, 5)}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
