import React from "react";
import { motion, useCycle } from "framer-motion";

function FolderView({ galleryData, handleFolderSelect }) {
  return (
    <div className="folder-grid">
      {galleryData.map((profile, idx) => {
        return (
          <motion.div
            className="folder-wrap"
            key={idx}
            onClick={() => handleFolderSelect(idx)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.img src="images/folder.svg" alt="some image" />
            <p>
              {profile.profileName} - {profile.matchLength}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

export default FolderView;
