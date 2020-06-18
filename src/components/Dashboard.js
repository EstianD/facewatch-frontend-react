import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

// Material ui
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import AuthContext from "../hooks/AuthContext";

// Components
import Header from "./Header/Header";
import Profiles from "./Profiles/Profiles";
import Main from "./Gallery/Main";

const Dashboard = ({ user, handleLogout }) => {
  const jwt = localStorage.getItem("jwt-auth");

  // FUNCTIONS FOR PROFILE AND GALLERY HOOKS
  // Define function to retrieve data for profiles
  const getProfileData = () => {
    axios
      .get("/api/profiles/profiles", {
        headers: {
          "Content-Type": `multipart/form-data`,
          "auth-token": jwt,
        },
      })
      .then((res) => {
        setProfiles(res.data["profiles"]);
        console.log(res);
      });
  };

  const getGalleryData = () => {
    console.log("running profiles");
    // Update the document title using the browser API
    axios
      .get("/api/profiles/getProfileMatches", {
        headers: {
          "Content-Type": `multipart/form-data`,
          "auth-token": jwt,
        },
      })
      .then((res) => {
        setGalleryData(res.data);
        console.log(res);
      });
  };

  const [profiles, setProfiles] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  // Get JWT
  // const jwt = localStorage.getItem("jwt-auth");
  // Get gallery images
  useEffect(() => {
    getGalleryData();
  }, [profiles]);

  // Get profiles
  useEffect(() => {
    getProfileData();
  }, []);

  const onProfileDelete = (e) => {
    const id = e;

    axios
      .post(
        "/api/profiles/delete",
        {
          id: id,
        },
        {
          headers: {
            "Content-Type": `application/json`,
            "auth-token": jwt,
          },
        }
      )
      .then((res) => {
        console.log(res);
        const newProfilesArr = profiles.filter(
          (profile) => profile["id"] !== id
        );
        setProfiles(newProfilesArr);
        // getGalleryData();
      });
  };

  return (
    <AuthContext.Provider value={user}>
      <CssBaseline />
      <Container maxWidth="md">
        <div>
          <Header handleLogout={handleLogout} />
          <Profiles
            profiles={profiles}
            setProfiles={setProfiles}
            onProfileDelete={onProfileDelete}
            getProfileData={getProfileData}
          />
          <Main galleryData={galleryData} getGalleryData={getGalleryData} />
        </div>
      </Container>
    </AuthContext.Provider>
  );
};

export default Dashboard;
