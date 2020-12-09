import React from "react";
import { motion } from "framer-motion";
import Loader from "../Header/Loader";

function FolderView({ galleryData, handleFolderSelect, galleryLoading }) {
  return (
    <div>
      <div className="folder-title-grid">
        <div>
          <h3>Folders</h3>
        </div>
        <div>
          <div>{galleryLoading && <Loader />}</div>
        </div>
      </div>

      <div className="folder-grid">
        {galleryData.map((profile, idx) => {
          return (
            <motion.div
              className="folder-wrap"
              key={idx}
              onClick={() => handleFolderSelect(idx)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              // transition={{ delay: 0.5 }}
            >
              <motion.img
                src="images/folder.svg"
                alt="some image"
                whileHover={{ scale: 1.1 }}
              />
              <p className="folder-text">
                {profile.profileName} ({profile.matchLength})
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default FolderView;
