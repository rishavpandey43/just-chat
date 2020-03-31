const passport = require("passport");
const User = require("../models/user.model"); // import User Schema

const getUserListController = (req, res) => {
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
};

const userSignupController = (req, res, next) => {
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
          let error = new Error();
          error.status = 422;
          error.message = `${err._message}, Please enter valid detail to continue`;
          next(error);
        }
        if (err.name === "UserExistsError") {
          let error = new Error();
          error.status = 409;
          error.message = err.message;
          next(error);
        }
        if (err.code == 11000 && err.name === "MongoError") {
          let error = new Error();
          error.status = 409;
          error.message = `Email is already registered`;
          next(error);
        } else {
          let error = new Error();
          error.status = 500;
          error.message = err.message;
          next(error);
        }
      } else {
        if (req.body.firstName) user.firstName = req.body.firstName;
        if (req.body.lastName) user.lastName = req.body.lastName;
        if (req.body.email) user.email = req.body.email;
        user.save((err, user) => {
          if (err) {
            let error = new Error();
            error.status = 500;
            error.message = err.message;
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
                lastName: user.lastName
              }
            });
          });
        });
      }
    }
  );
};

const userLoginController = (req, res) => {
  // const token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({ success: true, status: "You are successfully logged in!" });
};

const userLogoutController = (req, res, next) => {
  next();
};

exports.getUserListController = getUserListController;
exports.userSignupController = userSignupController;
exports.userLoginController = userLoginController;
exports.userLogoutController = userLogoutController;
