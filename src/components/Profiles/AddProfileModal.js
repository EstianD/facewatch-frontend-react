import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { FormControl } from "@material-ui/core";
import ProfileMsg from "./ProfileMsg";
import AddProfileProgressBar from "./AddProfileProgressBar";

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

const AddProfileModal = () => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(false);
  const [profileuser, setprofileuser] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadPerc, setUploadPerc] = useState(0);

  const getImage = (e) => {
    const files = e.target.files;
    console.log(files[0]);
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const handleProfileNameChange = (e) => {
    setprofileuser(e.target.value);
    console.log(profileuser);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    const URL = process.env.REACT_APP_NODE_URL;
    const jwt = localStorage.getItem("jwt-auth");
    // console.log(profileuser);
    // Create FormData
    const formData = new FormData();
    formData.append("file", file);
    formData.set("name", profileuser);

    if (file && profileuser) {
      try {
        const res = await axios.post(`/api/file-upload/profile`, formData, {
          headers: {
            "Content-Type": `multipart/form-data`,
            "auth-token": jwt,
          },
          onUploadProgress: (progressEvent) => {
            setUploadPerc(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
            // clear percentage
            setTimeout(() => setUploadPerc(0), 10000);
          },
        });

        console.log(res);

        setMessage("File uploaded succesfully!");
        setFile(null);
        setprofileuser("");

        const { fileName, filePath } = res.data;
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
      <AddProfileProgressBar
        uploadPerc={uploadPerc}
        setUploadPerc={setUploadPerc}
      />
    </div>
  );

  return (
    <div className={classes.root}>
      <Button type="button" onClick={handleOpen}>
        Add Profile
      </Button>
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
