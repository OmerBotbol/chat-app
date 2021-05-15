import React from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "../style/Login.css";

const ANONYMOUS =
  "https://firebasestorage.googleapis.com/v0/b/chat-app-4d700.appspot.com/o/avatars-fuFi52Szkbdm16Gg-arzAGQ-t500x500.jpg?alt=media&token=715fa91f-e6e7-4e57-9fb7-0b1931f5c6f5";

function Login() {
  const fireStore = firebase.firestore();
  const userRef = fireStore.collection("users");
  const [users] = useCollectionData(userRef);

  const createUser = (user) => {
    const usersId = users.map((userData) => userData.uid);
    if (!usersId.includes(user.uid)) {
      userRef.doc(user.uid).set({
        imageUrl: ANONYMOUS,
        uid: user.uid,
        userName: user.displayName,
      });
    }
  };

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(({ user }) => createUser(user));
  };

  const loginWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(({ user }) => createUser(user));
  };

  return (
    <div id="login-page">
      <h1 id="login-header">login</h1>
      <div id="login-buttons">
        <button onClick={() => loginWithGoogle()}>login with google</button>
        <button
          onClick={() => {
            loginWithFacebook();
          }}
        >
          login with facebook
        </button>
      </div>
    </div>
  );
}

export default Login;
