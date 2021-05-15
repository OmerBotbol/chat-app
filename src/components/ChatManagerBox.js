import React, { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";

function ChatManagerBox({ user, openChatManagerBox }) {
  const fireStore = firebase.firestore();
  const storage = firebase.storage();
  const refChats = fireStore.collection("chat rooms");
  const userRef = fireStore.collection("users");
  const [chatIdToJoin, setChatIdToJoin] = useState("");
  const [messageToUser, setMessageToUser] = useState("");
  const [imageFile, setImageFile] = useState();
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
    } else {
      setMessageToUser("Please enter name for the chat");
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
        setMessageToUser("You are already in this chat");
      }
    } else {
      setMessageToUser("ID was not found");
    }
  };

  const uploadProfileImage = () => {
    console.log(imageFile);
    const uploadTask = storage.ref(imageFile.name).put(imageFile);
    uploadTask.on("state_changed", () => {
      storage
        .ref()
        .child(imageFile.name)
        .getDownloadURL()
        .then((url) => {
          console.log(url);
          openChatManagerBox(false);
          userRef.doc(user.uid).update({ imageUrl: url });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <div id="chat-manager">
      <p>Open new chat</p>
      <input
        type="text"
        ref={chatName}
        onChange={(e) => (chatName.current = e.target.value)}
      />
      <button onClick={() => createChat()}>Create</button>
      <p>Join to chat</p>
      <input
        type="text"
        placeholder="Enter Chat ID Here"
        onChange={(e) => setChatIdToJoin(e.target.value)}
      />
      <button onClick={() => joinToChat()}>Join</button>
      <p>Add profile image</p>
      <input
        type="file"
        onChange={(e) => {
          setImageFile(e.target.files[0]);
        }}
      />
      <button onClick={() => uploadProfileImage()}>upload</button>
      <button id="logout-btn" onClick={() => firebase.auth().signOut()}>
        logout
      </button>
      <p>{messageToUser}</p>
    </div>
  );
}

export default ChatManagerBox;