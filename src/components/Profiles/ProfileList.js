import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import axios from "axios";

import Profile from "./Profile";

const ProfileList = ({ profiles, onProfileDelete }) => {
  return (
    <div>
      <Grid container item xs={12} spacing={3}>
        {profiles.map((profile) => {
          return (
            <Grid item xs={3} key={profile["id"]}>
              <Profile profile={profile} onProfileDelete={onProfileDelete} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default ProfileList;
