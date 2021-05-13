import React from "react";
import ChatMessage from "./ChatMessage";
import "../style/Profile.css";

function ChatsWindow({ chatMessages, header }) {
  return (
    <div id="chat-window">
      <h3>{header}</h3>
      {chatMessages.map((data, i) => {
        return <ChatMessage data={data} key={i} />;
      })}
    </div>
  );
}

export default ChatsWindow;
