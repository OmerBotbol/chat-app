import React from "react";

function ChatList({ chat, openChatWindow }) {
  return <li onClick={() => openChatWindow(chat)}>{chat.name}</li>;
}

export default ChatList;
