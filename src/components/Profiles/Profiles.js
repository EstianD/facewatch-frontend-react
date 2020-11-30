import React from "react";
import AddProfileModal from "./AddProfileModal";

import ProfileList from "./ProfileList";

const Profiles = ({
  profiles,
  setProfiles,
  onProfileDelete,
  getProfileData,
  profileLoading,
}) => {
  return (
    <div>
      {/* <AddProfileModal
        setProfiles={setProfiles}
        profiles={profiles}
        getProfileData={getProfileData}
        profileLoading={profileLoading}
      /> */}
      {/* <ProfileList profiles={profiles} onProfileDelete={onProfileDelete} /> */}
    </div>
  );
};

export default Profiles;
