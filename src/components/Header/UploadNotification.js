import React, { useEffect } from "react";

const UploadNotification = ({ uploadNotification, setUploadNotification }) => {
  useEffect(() => {
    setTimeout(() => {
      setUploadNotification(null);
    }, 4000);
  }, [uploadNotification]);
  return (
    <div>
      <div className="add-col">
        <div className="upload-notification">{uploadNotification}</div>
      </div>
    </div>
  );
};

export default UploadNotification;
