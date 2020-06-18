import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { v4 as uuidv4 } from "uuid";
// import tileData from "./tileData";
import GalleryImage from "./GalleryImage";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Gallery = ({ galleryData, text }) => {
  const classes = useStyles();
  console.log(galleryData);

  const loadGallery = () => {
    return (
      <React.Fragment>
        {galleryData.map((profile) => (
          <div key={uuidv4()}>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={3}>
                <h3 key={profile["profileName"]}>
                  {profile["profileName"]} ({profile["matchLength"]})
                </h3>
              </Grid>
              <Grid item xs={9} />

              {profile["matches"].map((match) => {
                return (
                  <div key={uuidv4()}>
                    <Grid item xs={"auto"}>
                      <Paper className={classes.paper}>
                        <img
                          height="200px"
                          width="300px"
                          src={match}
                          alt={match}
                          key={uuidv4()}
                        />
                      </Paper>
                    </Grid>
                  </div>
                );
              })}
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          </div>
        ))}
      </React.Fragment>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid container item xs={"auto"} spacing={6}>
          {loadGallery()}
        </Grid>
      </Grid>
    </div>
  );
};

export default Gallery;
