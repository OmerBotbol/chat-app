import React from "react";
import "../style/ChatMessage.css";

function ChatMessage({ data, userId }) {
  return (
    <div className="bubble">
      <div className={userId === data.userId ? "box" : "right box"}>
        <img className="in-chat-image" src={data.userImage} alt="profile" />
        <div className={userId === data.userId ? "my message" : "message"}>
          <div className="userName">{data.userName}</div>
          <p className="content">{data.content}</p>
          <div className="time">
            {new Date(data.createdAt.seconds * 1000).toTimeString().slice(0, 5)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
