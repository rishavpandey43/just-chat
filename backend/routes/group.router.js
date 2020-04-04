const express = require("express");

const authenticate = require("../utils/authenticate");
const cors = require("../utils/cors.js");

const groupRouterController = require("../controllers/group.router.controller");

const groupRouter = express.Router(); // initialize express router

// Enabling CORS Pre-Flight
groupRouter
  .options("*", cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(
    "/create-new-group",
    cors.corsWithOptions,
    authenticate.verifyUser,
    groupRouterController.createGroupController
  )
  .put(
    "/join-group",
    cors.corsWithOptions,
    authenticate.verifyUser,
    groupRouterController.joinGroupController
  )
  .get(
    "/get-group-list",
    cors.corsWithOptions,
    authenticate.verifyUser,
    groupRouterController.getGroupListController
  );

module.exports = groupRouter;
