const passport = require('passport');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const User = require('../models/user.model'); // import User Schema
const Token = require('../models/token.model');

const authenticate = require('../middlewares/authenticate');

var smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'correspond.rishav@gmail.com',
    pass: 'nugmgxasnngznwwb',
  },
});

exports.userSignupController = (req, res, next) => {
  User.register(
    new User({
      username: req.body.username,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      verified: false,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        if (err.name == 'ValidationError' && err._message) {
          const error = new Error(
            `${err._message}, Please enter valid detail to continue`
          );
          error.status = 422;
          next(error);
        }
        if (err.name === 'UserExistsError') {
          const error = new Error(err.message);
          error.status = 409;
          next(error);
        }
        if (err.code == 11000 && err.name === 'MongoError') {
          const error = new Error(`Email is already registered`);
          error.status = 409;
          next(error);
        } else {
          const error = new Error(err.message);
          error.status = 500;
          next(error);
        }
      } else {
        // create token
        Token.create({
          userId: user._id,
          token: crypto.randomBytes(16).toString('hex'),
        })
          .then((token) => {
            const verificationLink = `http://${req.headers.host}/user/verify-user/?token=${token.token}`;
            let mailOptions = {
              from: 'no-reply@yourwebapplication.com',
              to: user.email,
              subject: 'Account Verification',
              html: `
                <html>
                  <h3>Hello ${user.username}</h3>
                  <p>Thanks for trying our chat application. You're just one step left to start enjoying our service.</p>
                  <p>Please confirm your account by clicking here</p>
                  <p> <strong>Note:</strong> Link will automatically expire in 10 minutes.</p>
                  <button style="border: 1px solid #c90bce; background-color: #c90bce; color: #fff; border-radius: 2rem; padding: 0.4rem 2rem;"><a href="${verificationLink}">Verify now</a></button>
                  <br/>
                  <p>You can also paste this url  <strong>${verificationLink}</strong> in the browser </p>
                  <br/>
                  <br/>
                </html>
              `,
            };
            smtpTransport.sendMail(mailOptions, (error, info) => {
              if (error) {
                const err = new Error(`Internal Server Error`);
                err.status = 500;
                next(err);
              } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                  message: `A verification email has been sent to ${user.email}.`,
                });
              }
            });
          })
          .catch((err) => next(err));
      }
    }
  );
};

exports.userConfirmationController = (req, res, next) => {
  Token.findOne({ token: req.query.token })
    .then((token) => {
      if (!token) {
        let error = new Error(
          `Token is either expired or invalid, You can ask for new token through login page`
        );
        error.status = 400;
        next(error);
      } else {
        User.findById(token.userId)
          .then((user) => {
            if (!user) {
              let error = new Error(
                `We were unable to find a user for this token. `
              );
              error.status = 404;
              next(error);
            } else {
              if (user.verified) {
                let error = new Error(`You're already verified, Please login.`);
                error.status = 400;
                next(error);
              }
              user.verified = true;
              user
                .save()
                .then((user) => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json({
                    message: `${user.username} has been successfully verified.`,
                  });
                })
                .catch((err) => next(err));
            }
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
};

exports.userLoginController = (req, res, next) => {
  // on successful authentication, passport save user detail as req.user.
  if (!req.user.verified) {
    // send new token to email
    // create token
    Token.create({
      userId: req.user._id,
      token: crypto.randomBytes(16).toString('hex'),
    })
      .then((token) => {
        const verificationLink = `http://${req.headers.host}/user/verify-user/?token=${token.token}`;
        let mailOptions = {
          from: 'no-reply@yourwebapplication.com',
          to: req.user.email,
          subject: 'Account Verification',
          html: `
                <html>
                  <h3>Hello ${req.user.username}</h3>
                  <p>Thanks for trying our chat application. You're just one step left to start enjoying our service.</p>
                  <p>Please confirm your account by clicking here</p>
                  <p> <strong>Note:</strong> Link will automatically expire in 10 minutes.</p>
                  <button style="border: 1px solid #c90bce; background-color: #c90bce; color: #fff; border-radius: 2rem; padding: 0.4rem 2rem;"><a href="${verificationLink}">Verify now</a></button>
                  <br/>
                  <p>You can also paste this url  <strong>${verificationLink}</strong> in the browser </p>
                  <br/>
                  <br/>
                </html>
              `,
        };
        smtpTransport.sendMail(mailOptions, (error, info) => {
          if (error) {
            const err = new Error(`Internal Server Error`);
            err.status = 500;
            next(err);
          } else {
            // now send the error
            const err = new Error(
              `You're still not verified, please verify from the token sent to your mail to login`
            );
            err.status = 403;
            next(err);
          }
        });
      })
      .catch((err) => next(err));
  } else {
    const token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
      message: 'You are successfully logged in!',
      token,
      userId: req.user._id,
      username: req.user.username,
    });
  }
};

exports.userLogoutController = (req, res, next) => {
  if (req.user) {
    req.session.destroy();
    res.clearCookie('SESSION_ID'); // clean up!
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ message: 'You are successfully logged out!' });
  } else {
    const err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
};

exports.getUserNameController = (req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ username: req.user.username, userId: req.user._id });
};

exports.getuserController = (req, res, next) => {
  User.findOne({
    username:
      req.query.username !== '' ? req.query.username : req.user.username,
  })
    .then((user) => {
      if (!user) {
        const err = new Error(
          `user ${
            req.query.username !== '' ? req.query.username : req.user.username
          } not found, please search with valid username`
        );
        err.status = 404;
        next(err);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
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
      res.setHeader('Content-Type', 'application/json');
      res.json({
        message: 'Your Profile has been updated successfully ',
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
          res.setHeader('Content-Type', 'application/json');
          res.json({
            message: 'Your Password has been updated successfully.',
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
