import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { v4 as uuidv4 } from "uuid";
import GalleryImage from "./GalleryImage";

const Gallery = ({ galleryData, selectedFolder, setSelectedImg }) => {
  console.log("GALLERY: ", galleryData);

  return (
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
    </div>
  );
};

export default Gallery;
