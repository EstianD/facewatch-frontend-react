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

// Import Signin service
import signin from "../../services/signin";
import isAuthenticated from "../../services/checkAuth";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({
  handleToggleSign,
  signupStatus,
  setsignupStatus,
  setUser,
}) {
  const classes = useStyles();

  // Component States
  const [signinValues, setSigninValues] = useState({
    signinEmail: "",
    signinPassword: "",
  });
  const [signinError, setSigninError] = useState(null);

  const handleSigninChange = (event) => {
    const { name, value } = event.target;

    setSigninValues({
      ...signinValues,
      [name]: value,
    });
  };

  // On Signin attempt
  const handleSigninSubmit = async (event) => {
    event.preventDefault();
    const signingIn = await signin(signinValues);

    if (signingIn.status) {
      localStorage.setItem("jwt-auth", signingIn.jwt);
      setUser(isAuthenticated());
      setSigninError(null);
      setsignupStatus({ status: null });
    } else {
      setSigninError(signingIn.error);
      setUser(null);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSigninSubmit} noValidate>
          {signupStatus.status && (
            <Alert severity="success">{signupStatus.status}</Alert>
          )}
          {signinError && <Alert severity="error">{signinError}</Alert>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="signinEmail"
            onChange={handleSigninChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="signinPassword"
            label="Password"
            type="password"
            id="password"
            onChange={handleSigninChange}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Button
                id="signin"
                onClick={(e) => handleToggleSign("signup")}
                color="primary"
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
