import React from "react";

function Profile({ user }) {
  return (
    <>
      <h1>Hello {user.displayName}</h1>
      <div>what would you like to do?</div>
    </>
  );
}

export default Profile;
