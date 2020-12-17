import React from "react";
import { motion } from "framer-motion";
import MainLoader from "../Header/MainLoader";

function FolderView({ galleryData, handleFolderSelect, galleryLoading }) {
  return (
    <div>
      <div className="folder-title-grid">
        <div>
          <h3>Folders</h3>
        </div>
        <div>
          <div>{galleryLoading && <MainLoader />}</div>
        </div>
      </div>

      <div className="folder-grid">
        {/* Loop through gallery state and display profiles as folders */}
        {galleryData.map((profile, idx) => {
          return (
            <motion.div
              className="folder-wrap"
              key={idx}
              onClick={() => handleFolderSelect(idx)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              layout
            >
              <motion.img
                src="images/folder.svg"
                alt="profile folder"
                whileHover={{ scale: 1.05 }}
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
