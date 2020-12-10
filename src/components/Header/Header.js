import React, { useContext, useState } from "react";
import AuthContext from "../../hooks/AuthContext";

// Import Components
import Logout from "./logout";

// Material ui stuff
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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

  return (
    // <div className={classes.root}>
    //   <AppBar position="static" style={{ margin: 0 }}>
    //     <Toolbar>
    //       <Typography variant="h6" className={classes.title}>
    //         {user.username}
    //       </Typography>

    //       <div>
    //         <Logout handleLogout={handleLogout} />
    //       </div>
    //     </Toolbar>
    //   </AppBar>
    // </div>
    <div className="top-nav">
      <div className="user-title">
        <h3>
          {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
        </h3>
      </div>
      <div className="logout-div">
        <Logout handleLogout={handleLogout} />
      </div>
    </div>
  );
};

export default Header;
