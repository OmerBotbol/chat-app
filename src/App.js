import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Profile from "./components/Profile";
import HomePage from "./components/HomePage";
import JoinChat from "./components/JoinChat";
import Signup from "./components/Signup";

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
  const [user, loading] = useAuthState(auth);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {!loading && user ? (
            <Profile user={user} />
          ) : !loading && !user ? (
            <HomePage />
          ) : (
            "loading..."
          )}
        </Route>
        <Route exact path="/signup" component={Signup} />
        {user && (
          <Route path="/join">
            <JoinChat userId={user.uid} />
          </Route>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
