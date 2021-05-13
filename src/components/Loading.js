import React, { useEffect, useState } from "react";
import Login from "./Login";

function Loading({ user }) {
  const [finishLoading, setFinishLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFinishLoading(true);
    }
  }, [user]);

  return <div>{finishLoading ? <Login /> : "Loading..."}</div>;
}

export default Loading;
