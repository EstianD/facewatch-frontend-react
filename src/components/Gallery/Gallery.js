import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { v4 as uuidv4 } from "uuid";
import GalleryImage from "./GalleryImage";
import Loader from "./../Header/Loader";

const Gallery = ({
  galleryData,
  setSelectedImg,
  selectedFolderId,
  handleFolderView,
  handleImageDelete,
  galleryLoading,
}) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [noImages, setNoImages] = useState("");

  useEffect(() => {
    setSelectedFolder(galleryData[selectedFolderId]);
    // console.log(galleryData[selectedFolderId].matchLength);
    if (galleryData[selectedFolderId].matchLength == 0) {
      console.log("nope");
      setNoImages("No images of this profile to be displayed!");
    }
  }, [galleryData]);

  const handleImageAction = (e, image) => {
    console.log(e.target.className);
    console.log(image);
    // Check the action clicked on image
    if (e.target.className == "img-wrap") {
      setSelectedImg(image);
    } else if (e.target.className == "image-delete") {
      // Delete image modal
      confirmImageDelete(image);
    }
  };

  // Delete image modal
  const confirmImageDelete = (image) => {
    confirmAlert({
      title: "Delete Image",
      message: "Are you sure you want to delete this image?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleImageDelete(image),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };
  console.log("SELECTED: ", selectedFolder);
  return (
    <div>
      <button onClick={() => handleFolderView()}>Back</button>
      <div className="gallery-title-grid">
        <div>
          <h3>Gallery - {selectedFolder && selectedFolder.profileName}</h3>
        </div>
        <div>
          <div>{galleryLoading && <Loader />}</div>
        </div>
      </div>
      <div className="img-grid">
        {galleryData &&
          selectedFolder &&
          selectedFolder.matches.map((image, idx) => (
            <motion.div
              layout
              className="img-wrap"
              key={idx}
              onClick={(e) => handleImageAction(e, image)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="image-actions">
                <div
                  className="image-delete"
                  // onClick={(e) => confirmDelete(profile["id"])}
                >
                  &#10060;
                </div>
              </div>
              <img src={image} alt="some image" />
            </motion.div>
          ))}
        {noImages}
      </div>
    </div>
  );
};

export default Gallery;
