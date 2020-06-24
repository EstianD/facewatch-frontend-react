import React from "react";
import Button from "@material-ui/core/Button";

const logout = ({ handleLogout }) => {
  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default logout;
