import React, { useState } from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatList from "./ChatList";
import ChatsWindow from "./ChatsWindow";
import "../style/Profile.css";

function Profile({ user }) {
  const fireStore = firebase.firestore();
  const refChats = fireStore.collection("chat rooms");
  const refMessages = fireStore.collection("messages");
  const [currentChatId, setCurrentChatId] = useState("");
  const [currentChatName, setCurrentChatName] = useState("");

  const [chats] = useCollectionData(
    refChats.where("users", "array-contains", user.uid)
  );
  const [chatMessages] = useCollectionData(
    refMessages.where("chatId", "==", currentChatId)
  );

  const openChatWindow = (chat) => {
    setCurrentChatId(chat.id);
    setCurrentChatName(chat.name);
  };

  return (
    <>
      <h1>Hello {user.displayName}</h1>
      <ul id="chat-list">
        <h3>chats</h3>
        {chats &&
          chats.map((chat, i) => {
            return (
              <ChatList key={i} chat={chat} openChatWindow={openChatWindow} />
            );
          })}
      </ul>
      {chatMessages && (
        <ChatsWindow header={currentChatName} chatMessages={chatMessages} />
      )}

      <button onClick={() => firebase.auth().signOut()}>logout</button>
    </>
  );
}

export default Profile;
