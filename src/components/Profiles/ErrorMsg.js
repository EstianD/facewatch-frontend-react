import React from "react";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";

const ErrorMsg = ({ modalError }) => {
  return (
    <div>{modalError && <Alert severity="error">{modalError}</Alert>}</div>
  );
};

ErrorMsg.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorMsg;
