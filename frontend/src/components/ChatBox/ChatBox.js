import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import socketIOClient from "socket.io-client";

import "./chatbox.css";

import Inbox from "./Inbox/Inbox";
import Messages from "./Messages/Messages";
import Loading from "../Loading/Loading";

import displayFlash from "../../utils/flashEvent";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const socketInstance = socketIOClient(baseUrl);
class ChatBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupList: [],
      currentGroup: null,
      isFetching: false,
    };
  }

  componentDidMount() {
    this.fetchGroupList();
    socketInstance.on("connect", () => {
      this.setState({ socketInstance });
    });

    socketInstance.on("receive-message", (data) => {
      this.fetchGroupList();
      console.log(data);
    });
  }

  sendMessage = (data) => {
    let currentGroup = this.state.currentGroup;
    currentGroup.messages.push(data.message);
    socketInstance.emit("send-message", data);
  };

  fetchGroupList = () => {
    this.setState({ isFetching: true });
    axios
      .get(baseUrl + "group/get-group-list", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            localStorage.getItem("chat_auth_token") ||
            sessionStorage.getItem("chat_auth_token")
          }`,
        },
        withCredentials: true,
      })
      .then((response) => {
        let groupList = response.data.groups.map((group) => {
          let newGroup = new Object({
            groupDetail: {
              groupId: group._id,
              name: group.name,
              owner: group.owner,
              createdAt: moment(group.createdAt).format("Do MMMM YYYY"),
            },
            messages: [...group.messages],
          });
          return newGroup;
        });
        this.setState({
          groupList: [...groupList],
          currentGroup: groupList[0],
          isFetching: false,
        });
        if (this.state.socketInstance) {
          this.state.socketInstance.emit("join-group", {
            groupId: this.state.currentGroup.groupDetail.groupId,
            userId: this.props.authDetail.userId,
          });
        }
      })
      .catch((error) => {
        this.setState({
          isFetching: false,
          groupList: null,
          currentGroup: null,
        });
        error.response
          ? displayFlash.emit("get-message", {
              message: error.response.data.message,
              type: "danger",
            })
          : displayFlash.emit("get-message", {
              message: `Network Error, Connection to server couldn't be established. Please try again.`,
              type: "danger",
            });
      });
  };

  updateCurrentRecipient = (recipientName) => {
    let currentGroup = this.state.groupList.find(
      (group) => group.groupDetail.name === recipientName
    );
    this.setState({ currentGroup });
    socketInstance.emit("join-group", {
      groupId: currentGroup.groupDetail.groupId,
      userId: this.props.authDetail.userId,
    });
  };

  render() {
    return (
      <div className="chat-wrapper">
        <div className="container">
          <div className="page-wrapper">
            <Link to="/profile"> &larr; Go back to profile</Link>
            <div className="row">
              <div className="inbox col-12 col-sm-4">
                <Inbox
                  isFetching={this.state.isFetching}
                  groupList={this.state.groupList}
                  currentGroupName={
                    this.state.currentGroup
                      ? this.state.currentGroup.groupDetail.name
                      : ""
                  }
                  updateCurrentRecipient={this.updateCurrentRecipient}
                  fetchGroupList={this.fetchGroupList}
                />
              </div>
              <div className="messages col-12 col-sm-8">
                {this.state.isFetching ? (
                  <div className="empty-chat-div">
                    <div>
                      <Loading isTrue={this.state.isFetching} />
                    </div>
                  </div>
                ) : (
                  <Messages
                    currentGroup={this.state.currentGroup}
                    currentUserId={this.props.authDetail.userId}
                    sendMessage={this.sendMessage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatBox;
