import React from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatList from "./ChatList";

function Profile({ user }) {
  const fireStore = firebase.firestore();
  const refChats = fireStore.collection("chat rooms");
  const [chats] = useCollectionData(
    refChats.where("users", "array-contains", user.uid)
  );
  return (
    <>
      <h1>Hello {user.displayName}</h1>
      <ul>
        {chats &&
          chats.map((chat) => {
            return <ChatList name={chat.name} />;
          })}
      </ul>

      <button onClick={() => firebase.auth().signOut()}>logout</button>
    </>
  );
}

export default Profile;
