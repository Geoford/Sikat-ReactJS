import React from "react";
import UserNavBar from "./NavBarUser";
import Background from "../Background";

const UserPageMainLayout = ({ children }) => {
  return (
    <div>
      <UserNavBar />
      <div>{children}</div>
      <Background />
    </div>
  );
};

export default UserPageMainLayout;
