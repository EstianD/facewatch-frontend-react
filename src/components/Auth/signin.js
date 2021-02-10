import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
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
  signup: {
    color: "#1697e0",
    "&:hover": {
      backgroundColor: "#fafafa",
    },
  },
  signinHeading: {
    color: "#1697e0",
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

  // Validate email
  function ValidateEmail(mail) {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      return true;
    }
    return false;
  }

  // On Signin attempt
  const handleSigninSubmit = async (event) => {
    event.preventDefault();
    // If email is empty
    if (signinValues.signinEmail == "" || signinValues.signinPassword == "") {
      setSigninError("Please enter a email and a password");
      // If email is not an email
    } else if (!ValidateEmail(signinValues.signinEmail)) {
      setSigninError("Please enter a valid email");
    } else {
      // If client side validation passed
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
    }
  };

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
          className={classes.signinHeading}
        >
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
            fullWidth
            id="email"
            label="Email Address"
            name="signinEmail"
            onChange={handleSigninChange}
            autoComplete="email"
            autoFocus
            InputLabelProps={{
              style: { color: "#1697e0" },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="signinPassword"
            label="Password"
            type="password"
            id="password"
            onChange={handleSigninChange}
            autoComplete="current-password"
            InputLabelProps={{
              style: { color: "#1697e0" },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
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
                className={classes.signup}
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
