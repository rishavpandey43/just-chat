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
          res.statusCode = 422;
          res.setHeader("Content-Type", "application/json");
          res.json(`${err._message}, Please enter valid detail to continue`);
          return;
        }
        if (err.name === "UserExistsError") {
          res.statusCode = 409;
          res.setHeader("Content-Type", "application/json");
          res.json(err.message);
          return;
        }
        if (err.code == 11000 && err.name === "MongoError") {
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
};

const userLoginController = (req, res) => {
  const token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true,
    token: token,
    status: "You are successfully logged in!"
  });
};

exports.getUserListController = getUserListController;
exports.userSignupController = userSignupController;
exports.userLoginController = userLoginController;
