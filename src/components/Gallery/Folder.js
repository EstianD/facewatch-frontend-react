import React, { useState } from "react";

// import Image from "material-ui-image";
import { Grid, Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  folderImg: {
    "&:hover": {
      backgroundColor: "rgb(247, 247, 247)",
      border: "1px solid black",
      transform: "scale(1.1)",
      transition: "transform 0.5s ease",
    },
  },
}));

function Folder({ profile }) {
  const classes = useStyles();

  // console.log("PROFILE: ", profile);
  return (
    <div>
      <Grid item xs={"auto"}>
        {/* <Paper className={classes.paper}> */}
        <img
          height="200px"
          width="200px"
          src="images/folder.svg"
          className={classes.folderImg}
        />
        <p>Profile (2)</p>
        {/* </Paper> */}
      </Grid>
    </div>
  );
}

export default Folder;
