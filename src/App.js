import "./App.css";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Profile from "./components/Profile";
import { useEffect } from "react";
import Loading from "./components/Loading";

firebase.initializeApp({
  apiKey: "AIzaSyAVCxBcTc0Zv1bJodxDZ_Pf-i6OH47O_lE",
  authDomain: "chat-app-4d700.firebaseapp.com",
  projectId: "chat-app-4d700",
  storageBucket: "chat-app-4d700.appspot.com",
  messagingSenderId: "49964249409",
  appId: "1:49964249409:web:705f6ffef235e2251d31c0",
  measurementId: "G-H6953L52J0",
});

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
    }
  }, [user]);

  return <div>{user ? <Profile user={user} /> : <Loading />}</div>;
}

export default App;
