import React from "react";
import Button from "@material-ui/core/Button";

const logout = ({ handleLogout }) => {
  return (
    <div>
      <a className="logout-btn" onClick={handleLogout}>
        Logout
      </a>
    </div>
  );
};

export default logout;
