import React from "react";
import NavBarAdmin from "./NavBarAdmin";
import Background from "../Background";

const AdminPageMainLayout = ({ children }) => {
  return (
    <div>
      <NavBarAdmin />
      <div>{children}</div>
      <Background />
    </div>
  );
};

export default AdminPageMainLayout;
