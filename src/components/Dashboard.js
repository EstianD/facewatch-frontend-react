import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// Material ui
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container, Grid } from "@material-ui/core";

import AuthContext from "../hooks/AuthContext";

// Components
import Header from "./Header/Header";
import Profiles from "./Profiles/Profiles";
import AddProfileModal from "../components/Profiles/AddProfileModal";
// import Main from "./Gallery/Main";
import UploadImage from "./Gallery/UploadImage";
import Folder from "./Gallery/Folder";
import GalleryImage from "../components/Gallery/GalleryImage";
import AddGallery from "./Gallery/AddGallery";
import Gallery from "./Gallery/Gallery";
import ImageModal from "./Gallery/ImageModal";
import FolderView from "./Gallery/FolderView";
import ProfileList from "./Profiles/ProfileList";

const Dashboard = ({ user, handleLogout }) => {
  const jwt = localStorage.getItem("jwt-auth");

  const { REACT_APP_NODE_URL } = process.env;
  const [profiles, setProfiles] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [profileLoading, setProfileLoading] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);

  // Folders
  const [view, setView] = useState("folder");
  const [selectedFolder, setSelectedFolder] = useState({});

  // Images
  const [selectedImg, setSelectedImg] = useState(null);

  console.log("DASHBOARD");
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
        console.log("PROFILES: ", res);
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
        console.log("MATCHES: ", res);
        setGalleryData(res.data);
        setGalleryLoading(false);
      });
  };

  // Get profiles
  useEffect(() => {
    console.log("GET PROFILE EFFECT");

    getProfileData();
  }, []);

  // Get gallery images
  useEffect(() => {
    console.log("GET GALLERY EFFECT");

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

  // Function for view change
  const handleFolderSelect = (id) => {
    // console.log(id);
    // console.log(galleryData[id]);
    setView("gallery");
    setSelectedFolder(galleryData[id]);
  };

  return (
    <AuthContext.Provider value={user}>
      <CssBaseline />
      <Container maxWidth="md">
        <div>
          <Header handleLogout={handleLogout} />
          <AddProfileModal
            setProfiles={setProfiles}
            profiles={profiles}
            getProfileData={getProfileData}
            profileLoading={profileLoading}
          />
          <ProfileList profiles={profiles} onProfileDelete={onProfileDelete} />
          <UploadImage />
          {/* <Profiles
            profiles={profiles}
            setProfiles={setProfiles}
            onProfileDelete={onProfileDelete}
            getProfileData={getProfileData}
            profileLoading={profileLoading}
          /> */}

          {view == "folder" && (
            <FolderView
              galleryData={galleryData}
              handleFolderSelect={handleFolderSelect}
            />
          )}
          {view == "gallery" && (
            <Gallery
              galleryData={galleryData}
              selectedFolder={selectedFolder}
              setSelectedImg={setSelectedImg}
            />
          )}
          {selectedImg && (
            <ImageModal
              selectedImg={selectedImg}
              setSelectedImg={setSelectedImg}
            />
          )}

          {/* {renderFolders()} */}
          {/* <AddGallery getGalleryData={getGalleryData} /> */}
          {/* { <Gallery galleryData={galleryData} />   */}
        </div>
      </Container>
    </AuthContext.Provider>
  );
};

export default Dashboard;
