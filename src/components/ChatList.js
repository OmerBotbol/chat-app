import React from "react";

function ChatList({ chat, setCurrentChatId }) {
  return <li onClick={() => setCurrentChatId(chat.id)}>{chat.name}</li>;
}

export default ChatList;
