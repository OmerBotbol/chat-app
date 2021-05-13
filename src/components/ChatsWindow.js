import React from "react";
import ChatMassage from "./ChatMassage";

function ChatsWindow({ chatMessages }) {
  return (
    <div>
      {chatMessages.map((data, i) => {
        return <ChatMassage data={data} key={i} />;
      })}
      {console.log(chatMessages)}
    </div>
  );
}

export default ChatsWindow;
