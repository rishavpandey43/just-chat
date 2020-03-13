// import required model
const express = require("express");
const passport = require("passport");

const User = require("../models/user.model"); // import User Schema

// import authentication files
const authenticate = require("../auth/authenticate");
const cors = require("../auth/cors");

const userRouter = express.Router(); // initialize express router

userRouter
  .get("/", (req, res) => {
    res.send("Hello World");
  })
  .post("/signup", (req, res, next) => {
    User.register(
      new User({
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({ err: err });
        } else {
          passport.authenticate("local")(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
              success: true,
              status: "Registration Successful!",
              userFullName: user.firstName + " " + user.lastName
            });
          });
        }
      }
    );
  })
  .post("/login", passport.authenticate("local"), (req, res) => {
    const token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      token: token,
      status: "You are successfully logged in!"
    });
  })
  .post("/updateDetail", (req, res) => {});

module.exports = userRouter;
