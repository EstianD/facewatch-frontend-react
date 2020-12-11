import React, { useState } from "react";
import styled from "styled-components";
// import { css } from "@emotion/core";

function UploadLoader({ componentLoading }) {
  // const [loading, setLoading] = useState(true);
  let Loader;

  if (componentLoading == "profile") {
    Loader = styled.div`
      border: 8px solid #f3f3f3;
      border-top: 8px solid #3498db;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      animation: spin 1.5s linear infinite;
      margin-top: 25%;
      margin-left: 25%;
    `;
  } else if (componentLoading == "gallery") {
    Loader = styled.div`
      border: 8px solid #f3f3f3;
      border-top: 8px solid #34d625;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      animation: spin 1.5s linear infinite;
      margin-top: 25%;
      margin-left: 25%;
    `;
  }

  // console.log(color);
  return (
    <div>
      {/* <div className="upload-loader" style={{ color }}></div> */}
      <Loader />
    </div>
  );
}

export default UploadLoader;
