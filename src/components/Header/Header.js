import React, { useContext, useState } from "react";
import AuthContext from "../../hooks/AuthContext";

// Import Components
import Logout from "./logout";

// Material ui stuff
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({ handleLogout }) => {
  const classes = useStyles();
  const user = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ margin: 0 }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {user.username}
          </Typography>

          <div>
            <Logout handleLogout={handleLogout} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
