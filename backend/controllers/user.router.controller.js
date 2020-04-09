const passport = require("passport");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model"); // import User Schema

const authenticate = require("../utils/authenticate");

const userSignupController = (req, res, next) => {
  User.register(
    new User({
      username: req.body.username,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        if (err.name == "ValidationError" && err._message) {
          let error = new Error(
            `${err._message}, Please enter valid detail to continue`
          );
          error.status = 422;
          next(error);
        }
        if (err.name === "UserExistsError") {
          let error = new Error(err.message);
          error.status = 409;
          next(error);
        }
        if (err.code == 11000 && err.name === "MongoError") {
          let error = new Error(`Email is already registered`);
          error.status = 409;
          next(error);
        } else {
          let error = new Error(err.message);
          error.status = 500;
          next(error);
        }
      } else {
        if (req.body.firstName) user.firstName = req.body.firstName;
        if (req.body.lastName) user.lastName = req.body.lastName;
        if (req.body.email) user.email = req.body.email;
        user.save((err, user) => {
          if (err) {
            let error = new Error(err.message);
            error.status = 500;
            next(error);
          }
          // also authenticate the user using local authentication on proper registration
          passport.authenticate("local")(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
              message: "Registration Successful!",
              user: {
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
              },
            });
          });
        });
      }
    }
  );
};

const userLoginController = (req, res, next) => {
  // on successful authentication, passport save user detail as req.user.
  const token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    message: "You are successfully logged in!",
    token,
    userId: req.user._id,
    username: req.user.username,
  });
};

const userLogoutController = (req, res, next) => {
  if (req.user) {
    req.session.destroy();
    res.clearCookie("SESSION_ID"); // clean up!
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({ message: "You are successfully logged out!" });
  } else {
    const err = new Error("You are not logged in!");
    err.status = 403;
    next(err);
  }
};

const getUserNameController = (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({ username: req.user.username, userId: req.user._id });
};

const getUserDetailController = (req, res, next) => {
  User.findOne({ username: req.query.username })
    .then((user) => {
      if (!user) {
        const err = new Error(`user ${req.query.username} doesn't exit`);
        err.status = 404;
        next(err);
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ user: user });
      }
    })
    .catch((err) => next(err));
};

const updateUserDetailController = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        title: req.body.title,
        aboutMe: req.body.aboutMe,
      },
    },
    { new: true }
  )
    .then((user) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        message: "Your Profile has been updated successfully ",
        user,
      });
    })
    .catch((err) => next(err));
};

exports.userSignupController = userSignupController;
exports.userLoginController = userLoginController;
exports.userLogoutController = userLogoutController;
exports.getUserNameController = getUserNameController;
exports.getUserDetailController = getUserDetailController;
exports.updateUserDetailController = updateUserDetailController;
