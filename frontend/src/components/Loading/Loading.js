import React from "react";

import "./loading.css";

const Loading = props =>
  props.isTrue ? (
    <div className="loader">
      <div className="lds-dual-ring" />
    </div>
  ) : (
    <div></div>
  );

export default Loading;
