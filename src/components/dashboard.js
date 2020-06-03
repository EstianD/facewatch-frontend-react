import React, { useContext } from "react";

// Material ui
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import AuthContext from "../hooks/AuthContext";

// Components
import Header from "./Header/Header";
import Profiles from "./Profiles/Profiles";
import Main from "./Gallery/Main";

const dashboard = ({ user, handleLogout }) => {
  return (
    <AuthContext.Provider value={user}>
      <CssBaseline />
      <Container maxWidth="md">
        change to existing repo
        <div>
          <Header handleLogout={handleLogout} />
          <Profiles />
          <Main />
        </div>
      </Container>
    </AuthContext.Provider>
  );
};

export default dashboard;
