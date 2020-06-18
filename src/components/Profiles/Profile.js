import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Profile = ({ profile, onProfileDelete }) => {
  const classes = useStyles();
  console.log(profile);

  const confirmDelete = (e) => {
    console.log(e);
    confirmAlert({
      title: "Confirm to submit",
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
    <Card className={classes.root} key={profile["id"]}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={profile["image"]}
          title={profile["profileName"]}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {profile["profileName"]}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={(e) => confirmDelete(profile["id"])}
        >
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Profile;
