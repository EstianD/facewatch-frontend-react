import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({
  handleToggleSign,
  setsignupStatus,
  signupStatus,
}) {
  // Deconstruct values from useForm

  // const [signupStatus, setSignupStatus] = useState(null);

  const submit = async () => {
    // Submitting
    let registering = await signup(signupValues);
    console.log(registering);
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSignupSubmit}>
          {signupStatus.status && (
            <Alert severity="error">{signupStatus.status}</Alert>
          )}
          {signupErrors.signupUsername && (
            <Alert severity="error">{signupErrors.signupUsername}</Alert>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="signupUsername"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="Username"
                autoFocus
                value={signupValues.signupUsername}
                onChange={handleSignupChange}
              />
            </Grid>
            {signupErrors.signupEmail && (
              <Alert severity="error">{signupErrors.signupEmail}</Alert>
            )}
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
              />
            </Grid>
            {signupErrors.signupPassword && (
              <Alert severity="error">{signupErrors.signupPassword}</Alert>
            )}
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
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button
                onClick={(e) => handleToggleSign("signin")}
                color="primary"
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
