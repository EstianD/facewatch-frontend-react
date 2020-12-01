import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 160,
  },
});

const Profile = ({ profile, onProfileDelete }) => {
  const classes = useStyles();

  const confirmDelete = (e) => {
    confirmAlert({
      title: "Delete Profile",
      message: "Are you sure you want to delete this profile?",
      buttons: [
        {
          label: "Yes",
          onClick: () => onProfileDelete(e),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  return (
    <div className={classes.root}>
      <Card>
        <CardActionArea>
          <div className="profile-img">
            <CardMedia
              className={classes.media}
              image={profile["image"]}
              title={profile["profileName"]}
            />
          </div>
          <CardContent>
            <Typography gutterBottom variant="subtitle1" component="h2">
              {profile["profileName"]}
            </Typography>
            <div className="profile-actions">
              <div
                className="profile-delete"
                onClick={(e) => confirmDelete(profile["id"])}
              >
                &#10060;
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default Profile;
