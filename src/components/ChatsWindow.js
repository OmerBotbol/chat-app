import React, { useState } from "react";
import ChatMessage from "./ChatMessage";
import firebase from "firebase";
import "../style/Profile.css";

function ChatsWindow({ chatMessages, header, user, currentChatId }) {
  const fireStore = firebase.firestore();
  const refMessages = fireStore.collection("messages");
  const [content, setContent] = useState("");

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
      <h3>{header}</h3>
      {chatMessages?.map((data, i) => {
        return <ChatMessage data={data} key={i} userId={user.uid} />;
      })}
      <div id="user-input">
        <input type="text" onChange={(e) => setContent(e.target.value)} />
        <button onClick={(e) => sendMessage(e)}>Send</button>
      </div>
    </div>
  );
}

export default ChatsWindow;
