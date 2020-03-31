// import required npm modules
const express = require("express");
const io = require("socket.io");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
var passport = require("passport");
var authenticate = require("./utils/authenticate");

// import required routes
const userRouter = require("./routes/user.router");

// configure dotenv to access environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(
  session({
    name: "SESSION_ID",
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: new FileStore({ logFn: function() {} })
    // cookie: {
    //   maxAge: 24 * 60 * 60 * 1000,
    //   secure: true
    // }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRouter);

// error handler
app.use((err, req, res, next) => {
  res.statusCode = err.status || 500;
  res.setHeader("Content-Type", "application/json");
  res.json(
    err.message && err.status
      ? { message: err.message }
      : { message: "Internal Server Error" }
  );
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
