import React, { useState } from "react";
import axios from "axios";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { motion } from "framer-motion";

function UploadImage({
  getGalleryData,
  setUploadNotification,
  setImageUploading,
}) {
  const [files, setFiles] = useState(null);
  const [error, setError] = useState(null);
  const [uploaded, setUploaded] = useState(null);

  const { REACT_APP_NODE_URL } = process.env;
  //   Define file types accepted
  const types = ["image/png", "image/jpeg"];

  // Upload images handle
  const handleUploadImages = async (e) => {
    const jwt = localStorage.getItem("jwt-auth");
    const formData = new FormData();
    let inputFiles = e.target.files;

    if (inputFiles.length > 0) {
      for (let i = 0; i < inputFiles.length; i++) {
        // Check if file is a accepted file type
        if (types.includes(inputFiles[i].type)) {
          console.log(inputFiles[i]);
          formData.append(`image`, inputFiles[i]);
        } else {
          setFiles(null);
          setError(
            "One or more images is not the required type. Please select image type PNG or JPEG."
          );
          return;
        }
      }
      setFiles(formData.getAll("image"));

      // Set error notifications
      setError("");
      // setUploaded("Files uploaded successfully");
      // Upload File
      try {
        setImageUploading(true);
        await axios
          .post(`${REACT_APP_NODE_URL}/file-upload/gallery`, formData, {
            headers: {
              "Content-Type": `multipart/form-data`,
              "auth-token": jwt,
            },
          })
          .then((res) => {
            // Check for successful response
            if (res.data.status === 200) {
              setImageUploading(false);
              // Set state for gallery update
              //   setUploaded((state) => state + 1);
              setUploadNotification("Files uploaded successfully");
              setTimeout(() => {
                getGalleryData();
                setUploadNotification(null);
                // setUploadPerc(0);
                //  setUploading(false);
              }, 3000);
            }
          });
      } catch (err) {
        console.log(err);
        setImageUploading(false);
      }
    }
  };

  return (
    <div>
      {/* <div className="add-image-grid"> */}
      <form>
        <input
          accept="image/*"
          id="imageAdd"
          type="file"
          className="img-add--input"
          multiple
          onChange={handleUploadImages}
        />
        <div className="add-col">
          <label htmlFor="imageAdd">
            {/* <Button
              color="primary"
              aria-label="add-image"
              className="img-add--button"
              component="span"
            > */}
            {/* <AddIcon fontSize="large" /> */}

            {/* <div className="add-image"> */}
            <motion.img
              className="add-image-btn"
              src="images/add-image-icon.png"
              whileHover={{ scale: 1.1 }}
            />
            {/* </div> */}
            {/* </Button> */}
          </label>
        </div>

        <div className="upload-message">
          {error && <div className="error">{error}</div>}
          {files && <div>{uploaded}</div>}
        </div>
      </form>
    </div>
    // </div>
  );
}

export default UploadImage;
