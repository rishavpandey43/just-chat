// import required npm modules
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const dotenv = require('dotenv');
const passport = require('passport');

// import required routes
const userRouter = require('./routes/user.router');
const groupRouter = require('./routes/group.router');

const User = require('./models/user.model');
const Group = require('./models/group.model');
const Message = require('./models/message.model');

// configure dotenv to access environment variables
dotenv.config();

// * Normalize a port into a number, string, or false.
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// * create express instance
const app = express();

// * Get port from environment and store in Express.
const PORT = normalizePort(process.env.PORT || '5000');
app.set('port', PORT);

// * Create HTTP server.
const server = http.createServer(app);

/* **************************************************************** */
// * BELOW IS THE CONFIGURATION OF SOCKET AND ALL IT"S ASSOCIATED FUNCTIONALITY
// const socket = io(httpServer);

// socket.on("connection", (socket) => {
//   socket.on("join-group", (data) => {
//     socket.join(data.groupId);
//   });

//   socket.on("send-message", ({ message, currentGroupId }) => {
//     const newMessage = new Message({
//       from: message.from,
//       content: message.content,
//     });

//     newMessage
//       .save()
//       .then((message) => {
//         Group.findById(currentGroupId)
//           .then((group) => {
//             group.messages.push(message);
//             group
//               .save()
//               .then((group) => {
//                 socket
//                   .to(currentGroupId)
//                   .emit("receive-message", { success: true });
//               })
//               .catch((err) => {
//                 console.log(err);
//                 socket
//                   .to(currentGroupId)
//                   .emit("receive-message", { success: false });
//               });
//           })
//           .catch((err) => {
//             console.log(err);
//             socket
//               .to(currentGroupId)
//               .emit("receive-message", { success: false });
//           });
//       })
//       .catch((err) => {
//         console.log(err);
//         socket.to(currentGroupId).emit("receive-message", { success: false });
//       });
//   });
// });

/* **************************************************************** */

// connect server to mongoDB Atlas
const URI = process.env.ATLAS_DB_URI;
mongoose.connect(URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Mongoose database connection established successfully');
});

connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(
  session({
    name: 'SESSION_ID',
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: new fileStore({
      logFn: function () {},
    }) /* { logFn: function() {} } */,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);
app.use('/group', groupRouter);

// error handler
app.use((err, req, res, next) => {
  // console.log('Error- ', err);
  // console.log(err.message);
  res.statusCode = err.status || 500;
  res.statusText = err.statusText || 'Internal Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.json({
    errMessage:
      err.message || 'Server is unable to process request, Please try again',
  });
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
