import React from "react";
import firebase from "firebase";

function Profile({ user }) {
  return (
    <>
      <h1>Hello {user.displayName}</h1>
      <button onClick={() => firebase.auth().signOut()}>logout</button>
    </>
  );
}

export default Profile;
