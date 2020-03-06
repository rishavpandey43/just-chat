const express = require("express");
const http = require("http");
const socket = require("socket.io");

const router = require("./routes/router");

const PORT = process.env.PORT || 5000;

const app = express();

const server = http.createServer(app);
const io = socket(server);

io.on("connection", socket => {
  console.log("We have a new connection!!!");

  socket.on("disconnect", () => {
    console.log("User has left!!!");
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started in port ${PORT}`));
