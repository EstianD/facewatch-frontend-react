import React from "react";

import Profile from "./Profile";

const ProfileList = ({ profiles, onProfileDelete }) => {
  return (
    <div className="profile-grid">
      {profiles.map((profile) => {
        return (
          <div key={profile["id"]} className="profile-div">
            <Profile profile={profile} onProfileDelete={onProfileDelete} />
          </div>
        );
      })}
    </div>
  );
};

export default ProfileList;
