import React from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

function Login() {
  const fireStore = firebase.firestore();
  const userRef = fireStore.collection("users");
  const [users] = useCollectionData(userRef);

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(({ user }) => {
        const usersId = users.map((userData) => userData.uid);
        if (!usersId.includes(user.uid)) {
          userRef.add({
            uid: user.uid,
            userName: user.displayName,
          });
        }
      });
  };

  return (
    <div>
      <h1>login</h1>
      <button onClick={() => loginWithGoogle()}>login with google</button>
    </div>
  );
}

export default Login;
