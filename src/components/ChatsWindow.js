import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import firebase from "firebase";
import "../style/ChatWindow.css";

function ChatsWindow({ chatMessages, header, user, currentChatId }) {
  const fireStore = firebase.firestore();
  const refMessages = fireStore.collection("messages");
  const [content, setContent] = useState("");
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const sendMessage = (event) => {
    refMessages
      .add({
        chatId: currentChatId,
        content: content,
        createdAt: firebase.firestore.Timestamp.now(),
        userId: user.uid,
        userName: user.displayName,
      })
      .then(() => {
        setContent("");
        event.target.parentNode.children[0].value = "";
      });
  };

  return (
    <div id="chat-window">
      <div id="chat-header">
        <h3>{header}</h3>
        <div>{currentChatId}</div>
      </div>
      <div id="chat-content">
        {chatMessages?.map((data, i) => {
          return <ChatMessage data={data} key={i} userId={user.uid} />;
        })}
        <div ref={divRef} />
      </div>
      <div id="user-input">
        <input
          id="message-input"
          type="text"
          onChange={(e) => setContent(e.target.value)}
        />
        <button id="send-btn" onClick={(e) => sendMessage(e)}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatsWindow;
