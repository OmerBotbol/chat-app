import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase";

function JoinChat({ userId }) {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const chatId = query.get("chatid");
  const fireStore = firebase.firestore();
  const refChats = fireStore.collection("chat rooms");
  const [chatUsers] = useCollectionData(refChats.where("id", "==", chatId));
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (chatUsers && !finished) {
      setFinished(true);
      refChats.doc(chatId).update({ users: [...chatUsers[0].users, userId] });
    }
  }, [chatUsers]);

  return (
    <>{finished ? <Redirect to="/" /> : <div>you will redirect soon</div>}</>
  );
}

export default JoinChat;
