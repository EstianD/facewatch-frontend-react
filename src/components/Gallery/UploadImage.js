import React, { useState } from "react";
import axios from "axios";

import { motion } from "framer-motion";

function UploadImage({
  getGalleryData,
  setUploadNotification,
  setImageUploading,
  setErrorNotification,
}) {
  const [files, setFiles] = useState(null);
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
          formData.append(`image`, inputFiles[i]);
        } else {
          setFiles(null);
          setErrorNotification(
            "One or more images is not the required type. Please select image type PNG or JPEG."
          );
          return;
        }
      }
      setFiles(formData.getAll("image"));

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
              setUploadNotification("Files uploaded successfully");
              // Update state after 3 seconds to give LAMBDA functions to execute
              setTimeout(() => {
                getGalleryData();
                setUploadNotification(null);
              }, 3000);
            }
          });
      } catch (err) {
        setImageUploading(false);
      }
    }
  };

  return (
    <div>
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
            <motion.img
              className="add-image-btn"
              src="images/add-image-icon.png"
              whileHover={{ scale: 1.1 }}
            />
          </label>
        </div>
        <div className="upload-message">{files && <div>{uploaded}</div>}</div>
      </form>
    </div>
  );
}

export default UploadImage;
