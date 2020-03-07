import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import "./chat.css";

import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "./Input/Input";
import TextContainer from "../TextContainer/TextContainer";

let socket;

const Chat = ({ location }) => {
  const [userName, setName] = useState("");
  const [userRoom, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [userMessage, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = process.env.REACT_APP_SOCKET_ENDPOINT;

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, error => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [messages]);

  const sendMessage = event => {
    event.preventDefault();
    if (userMessage) {
      socket.emit("sendMessage", userMessage);
      setMessage("");
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={userRoom} />
        <Messages messages={messages} name={userName} />
        <Input
          message={userMessage}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};
export default Chat;
