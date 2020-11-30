import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import ProfileMsg from "./ProfileMsg";
import AddProfileProgressBar from "./AddProfileProgressBar";
import ErrorMsg from "./ErrorMsg";

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
    backgroundColor: theme.palette.background.paper,
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
}) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(false);
  const [profileuser, setprofileuser] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  // const [uploadPerc, setUploadPerc] = useState(0);
  const [uploading, setUploading] = useState(false);
  const { REACT_APP_NODE_URL } = process.env;

  // Accepted file types
  const types = ["image/png", "image/jpeg"];

  const getImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file && types.includes(file.type)) {
      // const file = files[0];
      setFile(file);
    } else {
      setFile(null);
      setError("Please select image file of PNG or JPEG.");
    }
  };

  const handleProfileNameChange = (e) => {
    setprofileuser(e.target.value);
    // console.log(profileuser);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    // const URL = process.env.REACT_APP_NODE_URL;
    const jwt = localStorage.getItem("jwt-auth");
    // console.log(profileuser);
    // Create FormData
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", profileuser);

    // Check if file is selected with profile
    if (file && profileuser && !error) {
      try {
        setUploading(true);
        await axios
          .post(`${REACT_APP_NODE_URL}/file-upload/profile`, formData, {
            headers: {
              "Content-Type": `multipart/form-data`,
              "auth-token": jwt,
            },
          })
          .then((res) => {
            if (res.data.status === 200) {
              setMessage("File uploaded succesfully!");
              setFile(null);
              setprofileuser("");
              // re-render all profiles
              getProfileData();
              // setUploadPerc(100);
              setTimeout(() => {
                // setUploadPerc(0);
                setUploading(false);
              }, 1000);
            } else if (res.data.status === 401) {
              setprofileuser("");
              setMessage(res.data.msg);
              setUploading(false);
            } else {
              setMessage(
                "There was a error on our side, Please try again later."
              );
              setFile(null);
              setprofileuser("");
            }
          });
      } catch (err) {
        if (err.response.status === 500) {
          setMessage("There was a problem with the server");
        } else {
          setMessage(err.response.data.msg);
        }
      }
    } else {
      setMessage("Please enter a profile name with a image");
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
      <h2 id="simple-modal-title">Add Profile</h2>
      <p id="simple-modal-description">
        Add a profile to fillter your images by.
      </p>
      <form className={classes.form} noValidate onSubmit={handleProfileSubmit}>
        {message ? <ProfileMsg msg={message} /> : null}
        {error ? <ErrorMsg error={error} /> : null}
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
          onChange={getImage}
        />
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
      {uploading && (
        <>
          <AddProfileProgressBar />
        </>
      )}
    </div>
  );

  return (
    <div className={classes.root}>
      <Grid container item xs={12} spacing={3}>
        <Button type="button" onClick={handleOpen}>
          Add Profile
        </Button>
        {profileLoading && (
          <img
            height="75px"
            width="75px"
            src="images/loadingSpinner.gif"
            alt="loading"
          />
        )}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </Grid>
    </div>
  );
};

export default AddProfileModal;
