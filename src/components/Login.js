import React from "react";
import firebase from "firebase";

function Login() {
  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  return (
    <div>
      login
      <button onClick={() => loginWithGoogle()}>login with google</button>
    </div>
  );
}

export default Login;
