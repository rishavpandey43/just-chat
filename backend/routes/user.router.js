// import required model
const express = require("express");
const passport = require("passport");

const User = require("../models/user.model"); // import User Schema

// import authentication files
const authenticate = require("../auth/authenticate");
const cors = require("../auth/cors.js");

const userRouter = express.Router(); // initialize express router

// Enabling CORS Pre-Flight
userRouter.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

userRouter
  .get("/list", cors.cors, (req, res) => {
    User.find({})
      .then(
        users => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(users);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post("/signup", cors.corsWithOptions, (req, res, next) => {
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
          if (err.name == "ValidationError" && err._message) {
            res.statusCode = 422;
            res.setHeader("Content-Type", "application/json");
            res.json(`${err._message}, Please enter valid detail to continue`);
            return;
          }
          if ((err.code = 11000)) {
            console.log(err);
            res.statusCode = 409;
            res.setHeader("Content-Type", "application/json");
            res.json("Email is already registered");
            return;
          } else {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json(err);
            return;
          }
        } else {
          if (req.body.firstName) user.firstName = req.body.firstName;
          if (req.body.lastName) user.lastName = req.body.lastName;
          if (req.body.email) user.email = req.body.email;
          user.save((err, user) => {
            if (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.json({ err: err });
              return;
            }
            passport.authenticate("local")(req, res, () => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json({ success: true, status: "Registration Successful!" });
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
  });

module.exports = userRouter;
