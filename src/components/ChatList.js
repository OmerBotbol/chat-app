import React from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "../style/ChatList.css";

function ChatList({
  user,
  sourceImage,
  currentChatId,
  openChatManagerBox,
  openChatWindow,
}) {
  const fireStore = firebase.firestore();
  const refChats = fireStore.collection("chat rooms");
  const [chats] = useCollectionData(
    refChats.where("users", "array-contains", user.uid)
  );

  return (
    <ul id="chat-list">
      <div id="chat-list-header">
        <img id="profile-image" src={sourceImage} alt="profile" />
        <h3 id="username">{user.displayName}</h3>
        <button
          id="chat-manager-btn"
          onClick={() => openChatManagerBox((prev) => !prev)}
        >
          Settings
        </button>
      </div>
      {chats?.map((chat, i) => {
        return (
          <li
            key={i}
            className={currentChatId === chat.id ? "current chat" : "chat"}
            onClick={() => openChatWindow(chat)}
          >
            {chat.name}
          </li>
        );
      })}
    </ul>
  );
}

export default ChatList;
