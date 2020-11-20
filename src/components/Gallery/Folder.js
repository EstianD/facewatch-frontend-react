import React from "react";

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
}));

function Folder({ profile }) {
  const classes = useStyles();

  console.log("PROFILE: ", profile);
  return (
    <div>
      <Grid item xs={"auto"}>
        <Paper className={classes.paper}>
          <img height="200px" width="200px" src="images/folder.svg" />
        </Paper>
      </Grid>
    </div>
  );
}

export default Folder;
