import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

import "./chatbox.css";

import Inbox from "./Inbox/Inbox";
import Messages from "./Messages/Messages";
import Loading from "../Loading/Loading";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

class ChatBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupList: [],
      currentGroup: null
    };
  }

  componentDidMount() {
    axios
      .get(baseUrl + "group/get-group-lists", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("chat_auth_token") ||
            sessionStorage.getItem("chat_auth_token")}`
        },
        withCredentials: true
      })
      .then(response => {
        let groupList = response.data.groupList.map(group => {
          let newGroup = new Object({
            groupDetail: {
              groupId: group._id,
              name: group.name,
              createdBy: group.createdBy,
              createdAt: moment(group.createdAt).format("Do MMMM YYYY")
            },
            messageList: [...group.messageList]
          });
          return newGroup;
        });
        this.setState({
          groupList: [...groupList],
          currentGroup: groupList[0]
        });
      })
      .catch(error => {});
  }

  updateCurrentRecipient = recipientName => {
    let currentGroup = this.state.groupList.find(
      group => group.groupDetail.name === recipientName
    );
    this.setState({ currentGroup });
  };

  render() {
    return (
      <div className="chat-wrapper">
        <div className="container">
          <div className="main-wrapper">
            <div className="row">
              <div className="inbox col-12 col-sm-4">
                <Inbox
                  groupList={this.state.groupList}
                  currentGroupName={
                    this.state.currentGroup
                      ? this.state.currentGroup.groupDetail.name
                      : ""
                  }
                  updateCurrentRecipient={this.updateCurrentRecipient}
                />
              </div>
              <div className="messages col-12 col-sm-8">
                {/* {this.state.currentGroup ? (
                  <Messages currentGroup={this.state.currentGroup} />
                ) : (
                  <div className="empty-chat-div">
                    <div>
                      <h3>Select the conversation to view message.</h3>
                    </div>
                  </div>
                )} */}
                <Messages currentGroup={this.state.currentGroup} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatBox;
