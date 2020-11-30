import React from "react";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";

const ErrorMsg = ({ error }) => {
  return <div>{error && <Alert severity="error">{error}</Alert>}</div>;
};

ErrorMsg.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorMsg;
