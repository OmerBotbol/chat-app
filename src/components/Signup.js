import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase";
import { Redirect } from "react-router";

const ANONYMOUS =
  "https://firebasestorage.googleapis.com/v0/b/chat-app-4d700.appspot.com/o/avatars-fuFi52Szkbdm16Gg-arzAGQ-t500x500.jpg?alt=media&token=715fa91f-e6e7-4e57-9fb7-0b1931f5c6f5";

function Signup() {
  const fireStore = firebase.firestore();
  const userRef = fireStore.collection("users");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [finished, setFinished] = useState(false);
  const [users] = useCollectionData(userRef);
  let userToChange;

  const signupWithEmailAndPassword = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        userToChange = firebase.auth().currentUser;
        const usersId = users.map((userData) => userData.uid);
        if (!usersId.includes(user.uid)) {
          userRef
            .doc(user.uid)
            .set({
              imageUrl: ANONYMOUS,
              uid: user.uid,
              userName: username,
            })
            .then(() => {
              setFinished(true);
            });
        }
      })
      .then(() => {
        userToChange.updateProfile({
          displayName: username,
        });
      })
      .catch((err) => {
        console.log(err);
        debugger;
      });
  };

  return (
    <>
      {finished ? (
        <Redirect to="/" />
      ) : (
        <div>
          <label>email: </label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <label>username: </label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
          <label>password: </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => signupWithEmailAndPassword()}>submit</button>
        </div>
      )}
    </>
  );
}

export default Signup;
