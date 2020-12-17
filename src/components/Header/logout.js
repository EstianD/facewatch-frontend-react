import React from "react";

const logout = ({ handleLogout }) => {
  return (
    <div className="logout-btn">
      <h3 onClick={handleLogout}>Logout</h3>
    </div>
  );
};

export default logout;
