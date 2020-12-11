import React from "react";
import Button from "@material-ui/core/Button";

const logout = ({ handleLogout }) => {
  return (
    <div className="logout-btn">
      <h3 onClick={handleLogout}>Logout</h3>
    </div>
  );
};

export default logout;
