// import required model
const express = require("express");
const passport = require("passport");

// import authentication files
const authenticate = require("../utils/authenticate");
const cors = require("../utils/cors.js");

const userRouterController = require("../controllers/user.router.controller");

const userRouter = express.Router(); // initialize express router

// Enabling CORS Pre-Flight
userRouter
  .options("*", cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
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
  )
  .get(
    "/logout",
    cors.corsWithOptions,
    userRouterController.userLogoutController
  );

module.exports = userRouter;
