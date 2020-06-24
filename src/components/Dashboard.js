import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

// Material ui
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import AuthContext from "../hooks/AuthContext";

// Components
import Header from "./Header/Header";
import Profiles from "./Profiles/Profiles";
import Main from "./Gallery/Main";

const Dashboard = ({ user, handleLogout }) => {
  const jwt = localStorage.getItem("jwt-auth");

  const [profiles, setProfiles] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [profileLoading, setProfileLoading] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);
  // FUNCTIONS FOR PROFILE AND GALLERY HOOKS
  // Define function to retrieve data for profiles
  const getProfileData = () => {
    setProfileLoading(true);
    axios
      .get("/api/profiles/profiles", {
        headers: {
          "Content-Type": `multipart/form-data`,
          "auth-token": jwt,
        },
      })
      .then((res) => {
        setProfiles(res.data["profiles"]);
        setProfileLoading(false);
        // console.log(res);
      });
  };

  const getGalleryData = () => {
    setGalleryLoading(true);
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
        setGalleryLoading(false);
      });
  };

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
    setProfileLoading(true);

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
        // console.log(res);
        const newProfilesArr = profiles.filter(
          (profile) => profile["id"] !== id
        );
        setProfiles(newProfilesArr);
        setProfileLoading(false);
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
            profileLoading={profileLoading}
          />
          <Main
            galleryData={galleryData}
            getGalleryData={getGalleryData}
            galleryLoading={galleryLoading}
          />
        </div>
      </Container>
    </AuthContext.Provider>
  );
};

export default Dashboard;
