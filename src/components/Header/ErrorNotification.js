import React from "react";

function ErrorNotification({ errorNotification }) {
  return (
    <div>
      <div className="add-col">
        <div class="error-notification">{errorNotification}</div>
      </div>
    </div>
  );
}

export default ErrorNotification;
