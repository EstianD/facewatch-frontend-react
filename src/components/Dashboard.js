import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

// Material ui
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container, Grid } from "@material-ui/core";

import AuthContext from "../hooks/AuthContext";

// Components
import Header from "./Header/Header";
import Profiles from "./Profiles/Profiles";
import Main from "./Gallery/Main";
import Folder from "./Gallery/Folder";

const Dashboard = ({ user, handleLogout }) => {
  const jwt = localStorage.getItem("jwt-auth");

  const { REACT_APP_NODE_URL } = process.env;
  const [profiles, setProfiles] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [profileLoading, setProfileLoading] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);
  // FUNCTIONS FOR PROFILE AND GALLERY HOOKS
  // Define function to retrieve data for profiles
  const getProfileData = () => {
    setProfileLoading(true);
    axios
      .get(`${REACT_APP_NODE_URL}/profiles/profiles`, {
        headers: {
          "Content-Type": `multipart/form-data`,
          "auth-token": jwt,
        },
      })
      .then((res) => {
        console.log("RESPONSE: ", res);
        setProfiles(res.data["profiles"]);
        setProfileLoading(false);
        // console.log(res);
      });
  };

  // Retrieve gallery
  const getGalleryData = () => {
    setGalleryLoading(true);
    // Update the document title using the browser API
    axios
      .get(`${REACT_APP_NODE_URL}/profiles/getProfileMatches`, {
        headers: {
          "Content-Type": `multipart/form-data`,
          "auth-token": jwt,
        },
      })
      .then((res) => {
        console.log(res);
        setGalleryData(res.data);
        setGalleryLoading(false);
      });
  };

  function renderFolders() {
    const folderArray = galleryData.map((profile) => {
      console.log("PR", profile);

      return (
        <Grid container item xs={12} spacing={3}>
          <Folder profile={profile} />
        </Grid>
      );
    });
    return folderArray;
  }

  // Get profiles
  useEffect(() => {
    getProfileData();
  }, []);

  // Get gallery images
  useEffect(() => {
    getGalleryData();
  }, [profiles]);

  const onProfileDelete = (e) => {
    const id = e;
    setProfileLoading(true);

    axios
      .post(
        `${REACT_APP_NODE_URL}/profiles/delete`,
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
          {renderFolders()}
        </div>
      </Container>
    </AuthContext.Provider>
  );
};

export default Dashboard;
