import React from "react";
import "../style/ChatMessage.css";

function ChatMessage({ data, userId }) {
  return (
    <div className={userId === data.userId ? "my bubble" : "bubble"}>
      <div className={userId === data.userId ? "left message" : "message"}>
        <div className="userName">{data.userName}</div>
        <div className="content">{data.content}</div>
        <div className="time">
          {new Date(data.createdAt.seconds).toTimeString().split(" ")[0]}
        </div>
        {console.log(data)}
      </div>
    </div>
  );
}

export default ChatMessage;
