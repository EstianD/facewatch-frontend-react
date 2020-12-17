import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

// Import components
import MainLoader from "./../Header/MainLoader";

const Gallery = ({
  galleryData,
  setSelectedImg,
  selectedFolderId,
  handleImageDelete,
  galleryLoading,
}) => {
  // State for the selected profile
  const [selectedFolder, setSelectedFolder] = useState(null);
  // State for the gallery notification
  const [noImages, setNoImages] = useState("");

  // Set the selected profile's images to render
  // Update on gallery data update
  useEffect(() => {
    setSelectedFolder(galleryData[selectedFolderId]);
    // Check if the current profile have any images
    if (galleryData[selectedFolderId].matchLength == 0) {
      setNoImages("No images to display!");
    }
  }, [galleryData]);

  // Function for detecting image action
  // Actions: Render modal for enlarged image or delete image
  const handleImageAction = (e, image) => {
    // Check the action clicked on image
    if (e.target.className == "gallery-img") {
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

  return (
    <div>
      <div className="gallery-title-grid">
        <div>
          <h3>Gallery - {selectedFolder && selectedFolder.profileName}</h3>
        </div>
        <div>
          <div>{galleryLoading && <MainLoader />}</div>
        </div>
      </div>

      <ul className="gallery-ul">
        {galleryData &&
          selectedFolder &&
          selectedFolder.matches.map((image, idx) => (
            <motion.li
              className="gallery-li"
              key={idx}
              onClick={(e) => handleImageAction(e, image)}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ opacity: 0.9 }}
            >
              <div className="image-actions">
                <div className="image-delete">&#10060;</div>
              </div>

              {image && (
                <img src={image} alt="some image" className="gallery-img" />
              )}
            </motion.li>
          ))}
        <li></li>
      </ul>

      {noImages}
    </div>
    //
  );
};

export default Gallery;
