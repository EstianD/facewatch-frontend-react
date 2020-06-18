import React, { useEffect, useState } from "react";
import AddProfileModal from "./AddProfileModal";
import axios from "axios";

import ProfileList from "./ProfileList";

const Profiles = ({
  profiles,
  setProfiles,
  onProfileDelete,
  getProfileData,
}) => {
  return (
    <div>
      <AddProfileModal
        setProfiles={setProfiles}
        profiles={profiles}
        getProfileData={getProfileData}
      />
      <ProfileList profiles={profiles} onProfileDelete={onProfileDelete} />
    </div>
  );
};

export default Profiles;
