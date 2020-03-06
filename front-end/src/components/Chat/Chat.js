import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import "./chat.css";

let socket;

const Chat = ({ location }) => {
  const [userName, setName] = useState("");
  const [userRoom, setRoom] = useState("");

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
  return (
    <div>
      <h1>Chat</h1>
    </div>
  );
};
export default Chat;
