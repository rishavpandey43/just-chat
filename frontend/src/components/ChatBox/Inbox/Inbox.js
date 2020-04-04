import React from "react";

import "./inbox.css";

import Loading from "../../Loading/Loading";

const Inbox = props => {
  let inboxList = props.groupList.map((group, i) => (
    <li
      className={`recipient-list ${
        props.currentGroupName === group.groupDetail.name
          ? "active-recipient"
          : ""
      }`}
      onClick={props.updateCurrentRecipient.bind(null, group.groupDetail.name)}
      key={i}
    >
      <div className="recipient-img">
        <img
          src={require("../../../assets/images/group.png")}
          alt="group-icon"
          width="40px"
          height="40px"
        />
      </div>
      <div className="recipient-name">
        <span>{group.groupDetail.name}</span>
      </div>
    </li>
  ));
  return (
    <div className="inbox-wrapper">
      <div className="heading">
        <h4>Recent Conversation</h4>
      </div>
      <div className="inbox-list">
        <ul>
          {inboxList.length > 0 ? (
            inboxList
          ) : (
            <div className="text-center mt-5">
              <Loading isTrue={inboxList.length == 0} />
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Inbox;
