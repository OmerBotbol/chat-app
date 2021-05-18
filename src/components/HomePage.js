import React, { useState } from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "../style/HomePage.css";
import { Link } from "react-router-dom";

function HomePage() {
  const fireStore = firebase.firestore();
  const userRef = fireStore.collection("users");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users] = useCollectionData(userRef);

  const createUser = (user) => {
    const usersId = users.map((userData) => userData.uid);
    if (!usersId.includes(user.uid)) {
      userRef.doc(user.uid).set({
        imageUrl: user.photoURL,
        uid: user.uid,
        userName: user.displayName,
      });
    }
  };

  const loginWithEmailAndPassword = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential);
      });
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
      <div>
        <form id="login-form" onSubmit={() => loginWithEmailAndPassword()}>
          <p>email: </p>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <p>password: </p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-btn">
            submit
          </button>
        </form>
      </div>
      <div id="login-buttons">
        <button className="login-btn" onClick={() => loginWithGoogle()}>
          login with google
        </button>
        <button
          className="login-btn"
          onClick={() => {
            loginWithFacebook();
          }}
        >
          login with facebook
        </button>
        <Link to="/signup">Sign-up here</Link>
      </div>
    </div>
  );
}

export default HomePage;
