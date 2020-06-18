import React, { useEffect, useState } from "react";
import axios from "axios";

import AddGallery from "./AddGallery";
import Gallery from "./Gallery";

// import ImageSection from "./imageSection/";
// import FolderSection from "./folderSection";

const Main = ({ galleryData, getGalleryData }) => {
  return (
    <>
      <h1>Image Collection</h1>

      <AddGallery getGalleryData={getGalleryData} />
      <Gallery galleryData={galleryData} />
    </>
  );
};

export default Main;
