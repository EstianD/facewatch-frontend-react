import React from "react";
import Grid from "@material-ui/core/Grid";

import AddGallery from "./AddGallery";
import Gallery from "./Gallery";

const Main = ({ galleryData, getGalleryData, galleryLoading }) => {
  return (
    <>
      <Grid container item xs={12} spacing={3}>
        <Grid item xs={4}>
          <h1>Image Collection</h1>
        </Grid>
        <Grid item xs={4}>
          {galleryLoading && (
            <img
              height="75px"
              width="75px"
              src="images/loadingSpinner.gif"
              alt="loading"
            />
          )}
        </Grid>
        <Grid item xs={4} />

        <AddGallery getGalleryData={getGalleryData} />
        <Gallery galleryData={galleryData} />
      </Grid>
    </>
  );
};

export default Main;
