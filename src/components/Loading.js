import React, { useEffect, useState } from "react";
import Login from "./Login";

function Loading({ user }) {
  const [finishLoading, setFinishLoading] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setFinishLoading(true);
    }, 3000);
    return user && clearTimeout(timeOut);
  });

  return <div>{finishLoading ? <Login /> : "Loading..."}</div>;
}

export default Loading;
