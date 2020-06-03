import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const AddProfileProgressBar = ({ uploadPerc, setUploadPerc }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={uploadPerc} />
    </div>
  );
};

AddProfileProgressBar.propTypes = {
  uploadPerc: PropTypes.number.isRequired,
};

export default AddProfileProgressBar;
