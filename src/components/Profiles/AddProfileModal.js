import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { motion } from "framer-motion";

import ProfileMsg from "./ProfileMsg";
import ErrorMsg from "./ErrorMsg";
import MainLoader from "../Header/MainLoader";

import axios from "axios";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "#fff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const AddProfileModal = ({
  setProfiles,
  profiles,
  getProfileData,
  profileLoading,
  setUploadNotification,
  setProfileUploading,
  setErrorNotification,
}) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(false);
  const [profileuser, setprofileuser] = useState("");
  const [modalMessage, setModalMessage] = useState(null);
  const [modalError, setModalError] = useState(null);

  const { REACT_APP_NODE_URL } = process.env;

  // Accepted file types
  const types = ["image/png", "image/jpeg"];

  const getProfileImage = (e) => {
    const file = e.target.files[0];

    if (file && types.includes(file.type)) {
      setFile(file);
    } else {
      setFile(null);
      setErrorNotification("Please select image file of PNG or JPEG.");
    }
  };

  const handleProfileNameChange = (e) => {
    setprofileuser(e.target.value);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    const jwt = localStorage.getItem("jwt-auth");

    // Create FormData
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", profileuser);

    // Check if file is selected with profile
    // Send profile form to API
    if (file && profileuser && !modalError) {
      try {
        setProfileUploading(true);
        setOpen(false);

        await axios
          .post(`${REACT_APP_NODE_URL}/file-upload/profile`, formData, {
            headers: {
              "Content-Type": `multipart/form-data`,
              "auth-token": jwt,
            },
          })
          .then((res) => {
            if (res.data.status === 200) {
              setUploadNotification("Profile uploaded succesfully!");
              setFile(null);
              setProfileUploading(false);
              setprofileuser("");
              // re-render all profiles
              getProfileData();
              // Remove notification after 3 seconds
              // setTimeout(() => {
              //   setUploadNotification(null);
              // }, 3000);
            } else if (res.data.status === 401) {
              setprofileuser("");
              setModalMessage(res.data.msg);
            } else {
              setModalMessage(
                "There was a error on our side, Please try again later."
              );
              setFile(null);
              setprofileuser("");
            }
          });
      } catch (err) {
        if (err.response.status === 500) {
          setModalMessage("There was a problem with the server");
        } else {
          setModalMessage(err.response.data.msg);
        }
      }
    } else {
      setModalMessage("Please enter a profile name with a image");
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" className="add-profile-header">
        Add Profile
      </h2>

      <p id="simple-modal-description">
        Add a profile to fillter your images by.
      </p>
      <form className={classes.form} noValidate onSubmit={handleProfileSubmit}>
        {modalMessage ? <ProfileMsg msg={modalMessage} /> : null}
        {modalError ? <ErrorMsg modalError={modalError} /> : null}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="profile-name"
          label="profile Name"
          name="profile-name"
          onChange={handleProfileNameChange}
          autoFocus
          value={profileuser}
        />

        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={getProfileImage}
        />
        {file && <div className="uploading-image-title">{file.name}</div>}
        {!file && (
          <div className="uploading-image-title">No file selected!</div>
        )}
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
        <br />
        <br />

        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleProfileSubmit}
        >
          Add
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <div className="add-col" onClick={handleOpen}>
        <motion.img
          className="add-profile-btn"
          src="images/add-profile-icon-med.png"
          whileHover={{ scale: 1.1 }}
        />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default AddProfileModal;
