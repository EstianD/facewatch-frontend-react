import React, { useEffect } from "react";

function ErrorNotification({ errorNotification, setErrorNotification }) {
  useEffect(() => {
    setTimeout(() => {
      setErrorNotification(null);
    }, 4000);
  }, [errorNotification]);

  return (
    <div>
      <div className="add-col">
        <div class="error-notification">{errorNotification}</div>
      </div>
    </div>
  );
}

export default ErrorNotification;
