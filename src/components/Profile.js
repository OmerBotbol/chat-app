import React, { useState } from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatList from "./ChatList";
import ChatsWindow from "./ChatsWindow";
import "../style/Profile.css";
import ChatManagerBox from "./ChatManagerBox";

function Profile({ user }) {
  const fireStore = firebase.firestore();
  const refChats = fireStore.collection("chat rooms");
  const refMessages = fireStore.collection("messages");
  const [currentChatId, setCurrentChatId] = useState("");
  const [currentChatName, setCurrentChatName] = useState("");
  const [chatManagerBox, openChatManagerBox] = useState(false);

  const [chats] = useCollectionData(
    refChats.where("users", "array-contains", user.uid)
  );
  const [chatMessages] = useCollectionData(
    refMessages.where("chatId", "==", currentChatId).orderBy("createdAt")
  );

  const openChatWindow = (chat) => {
    setCurrentChatId(chat.id);
    setCurrentChatName(chat.name);
  };

  return (
    <div id="container">
      <ul id="chat-list">
        <div id="chat-list-header">
          <h3>{user.displayName}</h3>
          <button onClick={() => openChatManagerBox((prev) => !prev)}>
            Chat Manager
          </button>
          <button onClick={() => firebase.auth().signOut()}>logout</button>
        </div>
        {chats &&
          chats.map((chat, i) => {
            return (
              <ChatList key={i} chat={chat} openChatWindow={openChatWindow} />
            );
          })}
      </ul>
      {chatManagerBox && (
        <ChatManagerBox user={user} openChatManagerBox={openChatManagerBox} />
      )}
      {currentChatId && (
        <ChatsWindow
          header={currentChatName}
          currentChatId={currentChatId}
          chatMessages={chatMessages}
          user={user}
        />
      )}
    </div>
  );
}

export default Profile;
