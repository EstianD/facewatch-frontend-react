import React, { useState } from "react";
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

function Loader() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="head-loader">
      <PulseLoader margin={3} size={15} color={"#123abc"} loading={loading} />
    </div>
  );
}

export default Loader;
