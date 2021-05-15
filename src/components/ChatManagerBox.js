import React, { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";

function ChatManagerBox({ user, openChatManagerBox }) {
  const fireStore = firebase.firestore();
  const refChats = fireStore.collection("chat rooms");
  const [chatIdToJoin, setChatIdToJoin] = useState("");
  const chatName = useRef();
  const [chatUsers] = useCollectionData(
    refChats.where("id", "==", chatIdToJoin)
  );

  const createChat = () => {
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
          alert(
            `to join this chat, enter this url: ${window.location.href}join?chatid=${newId}`
          );
          openChatManagerBox(false);
          chatName.current = "";
        });
    }
  };

  const joinToChat = () => {
    if (chatUsers.length > 0) {
      const isExist = chatUsers[0].users.includes(user.uid);
      if (!isExist) {
        refChats
          .doc(chatIdToJoin)
          .update({ users: [...chatUsers[0].users, user.uid] })
          .then(() => {
            openChatManagerBox(false);
            setChatIdToJoin("");
          });
      } else {
        console.log("you are already in this chat");
      }
    } else {
      console.log("ID was not found");
    }
  };

  return (
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
        onChange={(e) => setChatIdToJoin(e.target.value)}
      />
      <button onClick={() => joinToChat()}>Join</button>
    </div>
  );
}

export default ChatManagerBox;
