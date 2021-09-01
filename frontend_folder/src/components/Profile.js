import React from "react";
import Header from "./Header";

const Profile = ({ children, name }) => {
  return (
    <div>
      <Header name={name} />
      {children}
    </div>
  );
};

export default Profile;
