import React, { useState } from "react";
import { css } from "@emotion/core";
import MoonLoader from "react-spinners/MoonLoader";

function UploadLoader() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="">
      {/* <MoonLoader size={50} color={"#123abc"} loading={loading} /> */}
      <div class="upload-loader"></div>
    </div>
  );
}

export default UploadLoader;
