import React, { useRef, useState } from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatList from "./ChatList";
import ChatsWindow from "./ChatsWindow";
import "../style/Profile.css";
import { v4 as uuidv4 } from "uuid";

function Profile({ user }) {
  const fireStore = firebase.firestore();
  const refChats = fireStore.collection("chat rooms");
  const refMessages = fireStore.collection("messages");
  const [currentChatId, setCurrentChatId] = useState("");
  const [currentChatName, setCurrentChatName] = useState("");
  const [chatManagerBox, openChatManagerBox] = useState(false);
  const [chatId, setChatId] = useState("");
  const chatName = useRef();

  const [chats] = useCollectionData(
    refChats.where("users", "array-contains", user.uid)
  );
  const [chatMessages] = useCollectionData(
    refMessages.where("chatId", "==", currentChatId).orderBy("createdAt")
  );
  const [chatUsers] = useCollectionData(refChats.where("id", "==", chatId));

  const openChatWindow = (chat) => {
    setCurrentChatId(chat.id);
    setCurrentChatName(chat.name);
  };

  const createChat = () => {
    console.log(chatName.current);
    if (chatName.current.length > 0) {
      const newId = uuidv4();
      refChats
        .doc(newId)
        .set({
          id: newId,
          name: chatName.current,
          users: [user.uid],
        })
        .then(() => {
          openChatManagerBox(false);
          chatName.current = "";
        });
    }
  };

  const joinToChat = () => {
    console.log(chatUsers[0]);
    refChats
      .doc(chatId)
      .update({ users: [...chatUsers[0].users, user.uid] })
      .then(() => {
        openChatManagerBox(false);
        setChatId("");
      });
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
        <div id="chat-manager">
          <p>open new chat</p>
          <input
            type="text"
            ref={chatName}
            onChange={(e) => (chatName.current = e.target.value)}
          />
          <button onClick={() => createChat()}>Create</button>
          <p>join to chat</p>
          <input
            type="text"
            placeholder="Enter Chat ID Here"
            onChange={(e) => setChatId(e.target.value)}
          />
          <button onClick={() => joinToChat()}>Join</button>
        </div>
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
