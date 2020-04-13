import React, { useState, useEffect } from "react";

import "./flash.css";

import displayFlash from "../../utils/flashEvent";

const Flash = () => {
  const [display, setDisplay] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  useEffect(() => {
    displayFlash.on("get-message", (data) => {
      setAlertType(data.type);
      setAlertMessage(data.message);
      setDisplay(true);
    });
    setTimeout(() => {
      setDisplay(false);
      setAlertType("");
      setAlertMessage("");
    }, 5000);
  }, [display]);

  return (
    <div
      className={`flash-wrapper ${display ? "d-block" : "d-none"} ${
        alertType === "success" ? "bg-success" : "bg-danger"
      }`}
    >
      <div className="row">
        <div className="col-8 col-sm-10">
          <div className="message">
            <strong>{alertMessage}</strong>
          </div>
        </div>
        <div className="col-4 col-sm-2">
          <div className="close-btn">
            <button
              className="btn"
              onClick={() => {
                setDisplay(false);
                setAlertType("");
                setAlertMessage("");
              }}
            >
              x
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flash;
