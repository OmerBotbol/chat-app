import React from "react";
import ChatMessage from "./ChatMessage";
import "../style/Profile.css";

function ChatsWindow({ chatMessages, header, userId }) {
  return (
    <div id="chat-window">
      <h3>{header}</h3>
      {chatMessages.map((data, i) => {
        return <ChatMessage data={data} key={i} userId={userId} />;
      })}
    </div>
  );
}

export default ChatsWindow;
