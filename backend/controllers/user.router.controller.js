const passport = require("passport");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model"); // import User Schema

const authenticate = require("../middlewares/authenticate");

exports.userSignupController = (req, res, next) => {
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

exports.userLoginController = (req, res, next) => {
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

exports.userLogoutController = (req, res, next) => {
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

exports.getUserNameController = (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({ username: req.user.username, userId: req.user._id });
};

exports.getuserController = (req, res, next) => {
  User.findOne({
    username:
      req.query.username !== "" ? req.query.username : req.user.username,
  })
    .then((user) => {
      if (!user) {
        const err = new Error(
          `user ${
            req.query.username !== "" ? req.query.username : req.user.username
          } not found, please search with valid username`
        );
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

exports.updateuserController = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        title: req.body.title,
        aboutMe: req.body.aboutMe,
        dob: req.body.dob,
        contactNum: req.body.contactNum,
        address: req.body.address,
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

exports.changePasswordController = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      user
        .changePassword(req.body.currentPassword, req.body.newPassword)
        .then((user) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            message: "Your Password has been updated successfully.",
          });
        })
        .catch(() => {
          const err = new Error(`password incorrect, try with valid password`);
          err.status = 401;
          next(err);
        });
    })
    .catch((err) => next(err));
};
