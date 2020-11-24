import React, { useState, useEffect } from "react";
import "./App.css";

// Compoonents
import Signin from "./components/Auth/signin";
import Signup from "./components/Auth/signup";
import Dashboard from "./components/Dashboard";

// Authentication
import isAuthenticated from "./services/checkAuth";

const App = () => {
  console.log("APP");

  // APP STATES
  // const [jwtState, setjwtState] = useState(null);
  const [user, setUser] = useState(isAuthenticated());

  const handleLogout = (e) => {
    localStorage.removeItem("jwt-auth");
    setUser(isAuthenticated());
    setsignupStatus({
      page: "signin",
      status: null,
    });
  };

  // Toggle signin/signup
  const [signupStatus, setsignupStatus] = useState({
    page: "signin",
    status: null,
  });
  // Handle signin/signup toggle
  const handleToggleSign = (componentValue) => {
    setsignupStatus({ page: componentValue });
  };

  //Components
  // Generate login form
  const signForm = () => {
    if (signupStatus.page === "signin") {
      return (
        <Signin
          handleToggleSign={handleToggleSign}
          signupStatus={signupStatus}
          setUser={setUser}
          setsignupStatus={setsignupStatus}
        />
      );
    } else {
      return (
        <Signup
          handleToggleSign={handleToggleSign}
          setsignupStatus={setsignupStatus}
          signupStatus={signupStatus}
        />
      );
    }
  };

  // Render
  return (
    <div>
      {user === null ? (
        signForm()
      ) : (
        <Dashboard user={user} handleLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
