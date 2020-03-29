// import required model
const express = require("express");
const passport = require("passport");

const User = require("../models/user.model"); // import User Schema

// import authentication files
const authenticate = require("../utils/authenticate");
const cors = require("../utils/cors.js");

const userRouterController = require("../controllers/user.router.controller");

const userRouter = express.Router(); // initialize express router

// Enabling CORS Pre-Flight
userRouter.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

userRouter
  // .get(
  //   "/list",
  //   cors.corsWithOptions,
  //   userRouterController.getUserListController
  // )
  .post(
    "/signup",
    cors.corsWithOptions,
    userRouterController.userSignupController
  )
  .post(
    "/login",
    cors.corsWithOptions,
    passport.authenticate("local"),
    userRouterController.userLoginController
  );

module.exports = userRouter;
