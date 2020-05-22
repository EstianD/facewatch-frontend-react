import React from "react";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";

const ProfileMsg = ({ msg }) => {
  return <div>{msg && <Alert severity="info">{msg}</Alert>}</div>;
};

ProfileMsg.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default ProfileMsg;
