import React from "react";
import "../style/ChatList.css";

function ChatList({ chat, openChatWindow }) {
  return (
    <li className="chat" onClick={() => openChatWindow(chat)}>
      {chat.name}
    </li>
  );
}

export default ChatList;
