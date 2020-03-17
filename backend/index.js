// import required npm modules
const http = require("http");
const express = require("express");
const io = require("socket.io");
const mongoose = require("mongoose");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const passport = require("passport");

// import required routes
const userRouter = require("./routes/user.router");

// configure dotenv to access environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

// connect server to mongoDB Atlas
const URI = process.env.ATLAS_DB_URI;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongoose database connection established successfully");
});

connection.on("error", function(err) {
  console.log("Mongoose default connection error: " + err);
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.use("/users", userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

server.listen(PORT, () => console.log(`Server has started in port ${PORT}`));
