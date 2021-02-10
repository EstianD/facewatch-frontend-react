import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

import useSignupForm from "../../hooks/useSignupForm";
import validateSignup from "../../services/validateSignup";
import signup from "../../services/signup";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "#1697e0",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#ffca28",
      color: "#fff",
    },
  },
  signin: {
    color: "#1697e0",
    "&:hover": {
      backgroundColor: "#fafafa",
    },
  },
  signupHeading: {
    color: "#1697e0",
  },
  signupError: {
    marginBottom: "5%",
  },
}));

export default function SignUp({
  handleToggleSign,
  setsignupStatus,
  signupStatus,
}) {
  const submit = async () => {
    // Submitting
    let registering = await signup(signupValues);

    if (registering.status) {
      // if (signup(signupValues)) {
      setsignupStatus({ status: "User added successfully!", page: "signin" });
    } else if (!registering.status) {
      setsignupStatus({ status: registering.error });
    } else {
      setsignupStatus({
        status: "Something went wrong. Try again!",
      });
    }
  };

  const {
    handleSignupChange,
    handleSignupSubmit,
    signupValues,
    signupErrors,
  } = useSignupForm(submit, validateSignup);

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className="auth-container">
      <CssBaseline />
      <div className={classes.paper}>
        <div className="home-title">
          <FontAwesomeIcon icon={faUsers} size="4x" />
        </div>
        <Typography
          component="h1"
          variant="h5"
          className={classes.signupHeading}
        >
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSignupSubmit}>
          {signupStatus.status && (
            <Alert severity="error">{signupStatus.status}</Alert>
          )}
          {/* Username error status */}
          {signupErrors.signupUsername && (
            <Alert severity="error" className={classes.signupError}>
              {signupErrors.signupUsername}
            </Alert>
          )}
          {/* Email error status */}
          {signupErrors.signupEmail && (
            <Alert severity="error" className={classes.signupError}>
              {signupErrors.signupEmail}
            </Alert>
          )}
          {/* Password error status */}
          {signupErrors.signupPassword && (
            <Alert severity="error" className={classes.signupError}>
              {signupErrors.signupPassword}
            </Alert>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="signupUsername"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="Username"
                autoFocus
                value={signupValues.signupUsername}
                onChange={handleSignupChange}
                InputLabelProps={{
                  style: { color: "#1697e0" },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="signupEmail"
                value={signupValues.signupEmail}
                autoComplete="email"
                onChange={handleSignupChange}
                InputLabelProps={{
                  style: { color: "#1697e0" },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="signupPassword"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={signupValues.signupPassword}
                onChange={handleSignupChange}
                InputLabelProps={{
                  style: { color: "#1697e0" },
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button
                onClick={(e) => handleToggleSign("signin")}
                className={classes.signin}
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
