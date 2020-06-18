const loadGallery = () => {
  return (
    <>
      {galleryData.map((profile) => (
        <>
          <h3 key={profile["profileName"]}>{profile["profileName"]}</h3>
          {profile["matches"].map((match) => {
            return (
              <>
                <img src={match} key={match} alt={match} />
              </>
            );
          })}
        </>
      ))}
    </>
  );
};
