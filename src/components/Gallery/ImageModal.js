import React from "react";
import { motion } from "framer-motion";

function ImageModal({ selectedImg, setSelectedImg }) {
  const handleSelectedImgClear = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };

  return (
    <motion.div
      className="backdrop"
      onClick={handleSelectedImgClear}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <img src={selectedImg} alt="enlarged" />
    </motion.div>
  );
}

export default ImageModal;
