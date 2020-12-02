import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { v4 as uuidv4 } from "uuid";
import GalleryImage from "./GalleryImage";

const Gallery = ({ galleryData, setSelectedImg, selectedFolderId }) => {
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

  return (
    <div>
      <h3>Gallery</h3>
      <div className="img-grid">
        {galleryData &&
          selectedFolder &&
          selectedFolder.matches.map((image, idx) => (
            <motion.div
              layout
              className="img-wrap"
              key={idx}
              onClick={() => setSelectedImg(image)}
            >
              <img src={image} alt="some image" />
            </motion.div>
          ))}
        {noImages}
      </div>
    </div>
  );
};

export default Gallery;
