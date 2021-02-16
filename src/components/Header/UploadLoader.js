import React from "react";
import styled from "styled-components";

function UploadLoader({ componentLoading }) {
  let color = componentLoading === "profile" ? "#3498db" : "#34d625";

  const Loader = styled.div`
    border: 8px solid #f3f3f3;
    border-top: 8px solid ${color};
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1.5s linear infinite;
    margin-top: 25%;
    margin-left: 25%;
  `;

  return (
    <div>
      <Loader />
    </div>
  );
}

export default UploadLoader;
