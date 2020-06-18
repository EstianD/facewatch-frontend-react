import React, { useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

// Components
import AddGalleryProgressBar from "./AddGalleryProgressBar";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
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

const AddGallery = ({ getGalleryData }) => {
  const classes = useStyles();

  // State hooks
  const [images, setImages] = useState([]);
  const [uploadPerc, setUploadPerc] = useState(0);
  const [uploading, setUploading] = useState(false);

  // Handle galery images upload
  const getImages = async (e) => {
    const jwt = localStorage.getItem("jwt-auth");
    const formData = new FormData();
    let files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      formData.append(`image`, files[i]);
    }

    console.log(formData.getAll("image"));

    if (formData) {
      try {
        setUploading(true);
        await axios
          .post(`/api/file-upload/gallery`, formData, {
            headers: {
              "Content-Type": `multipart/form-data`,
              "auth-token": jwt,
            },
          })
          .then((res) => {
            if (res.data.status === 200) {
              // setUploadPerc(100);
              getGalleryData();
              setTimeout(() => {
                // setUploadPerc(0);
                setUploading(false);
              }, 1000);
            }
            console.log(res);
          });
      } catch (err) {}
    }
  };

  return (
    <div>
      {!uploading && (
        <>
          <input
            accept="image/*"
            id="imageAdd"
            type="file"
            className={classes.input}
            multiple
            onChange={getImages}
          />

          <label htmlFor="imageAdd">
            <Button
              color="primary"
              aria-label="add-image"
              className={classes.button}
              component="span"
            >
              <AddIcon fontSize="large" />
            </Button>
          </label>
        </>
      )}

      {uploading && (
        <>
          <AddGalleryProgressBar
            uploadPerc={uploadPerc}
            setUploadPerc={setUploadPerc}
          />
        </>
      )}
    </div>
  );
};

export default AddGallery;
