import React, { useState } from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatList from "./ChatList";
import ChatsWindow from "./ChatsWindow";

function Profile({ user }) {
  const fireStore = firebase.firestore();
  const refChats = fireStore.collection("chat rooms");
  const refMessages = fireStore.collection("messages");
  const [currentChatId, setCurrentChatId] = useState("");

  const [chats] = useCollectionData(
    refChats.where("users", "array-contains", user.uid)
  );
  const [chatMessages] = useCollectionData(
    refMessages.where("chatId", "==", currentChatId)
  );

  return (
    <>
      <h1>Hello {user.displayName}</h1>
      <ul>
        {chats &&
          chats.map((chat, i) => {
            return (
              <ChatList
                key={i}
                chat={chat}
                setCurrentChatId={setCurrentChatId}
              />
            );
          })}
      </ul>
      {chatMessages && <ChatsWindow chatMessages={chatMessages} />}

      <button onClick={() => firebase.auth().signOut()}>logout</button>
    </>
  );
}

export default Profile;
