import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const AddGalleryProgressBar = ({ uploadPerc, setUploadPerc }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress variant="static" value={uploadPerc} />
    </div>
  );
};

AddGalleryProgressBar.propTypes = {
  uploadPerc: PropTypes.number.isRequired,
};

export default AddGalleryProgressBar;
