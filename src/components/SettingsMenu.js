import React, { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";
import "../style/SettingsMenu.css";

function SettingsMenu({ user, openSettingsMenu, settingsMenu }) {
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
          openSettingsMenu(false);
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
            openSettingsMenu(false);
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
          openSettingsMenu(false);
          userRef.doc(user.uid).update({ imageUrl: url });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <div id="settings-menu" className={settingsMenu ? "open" : "close"}>
      <div id="settings-menu-header">
        <h3>Settings</h3>
        <button
          id="close-btn"
          onClick={() => openSettingsMenu((prev) => !prev)}
        >
          X
        </button>
      </div>
      <div id="setting-container">
        <section id="create-chat">
          <h4 className="setting-header">Open new chat</h4>
          <input
            type="text"
            ref={chatName}
            onChange={(e) => (chatName.current = e.target.value)}
          />
          <button onClick={() => createChat()}>Create</button>
        </section>
        <section id="join-chat">
          <h4 className="setting-header">Join to chat</h4>
          <input
            type="text"
            placeholder="Enter Chat ID Here"
            onChange={(e) => setChatIdToJoin(e.target.value)}
          />
          <button onClick={() => joinToChat()}>Join</button>
        </section>
        <section id="add-profile-image">
          <h4 className="setting-header">Add profile image</h4>
          <input
            type="file"
            onChange={(e) => {
              setImageFile(e.target.files[0]);
            }}
          />
          <button id="upload-btn" onClick={() => uploadProfileImage()}>
            upload
          </button>
        </section>
      </div>
      <button id="logout-btn" onClick={() => firebase.auth().signOut()}>
        logout
      </button>
      <p id="error-message">{messageToUser}</p>
    </div>
  );
}

export default SettingsMenu;
