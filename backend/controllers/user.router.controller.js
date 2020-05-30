const crypto = require('crypto');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

const User = require('../models/user.model'); // import User Schema
const Token = require('../models/token.model');

const authenticate = require('../middlewares/authenticate');

// configure dotenv to access environment variables
dotenv.config();

const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
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
    // send new token to email, if user is not verified.
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
    // login if user is already verified
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

exports.getuserController = (req, res, next) => {
  User.findOne({
    username:
      req.query.username !== '' ? req.query.username : req.user.username,
  })
    .populate([
      { path: 'friendList', model: 'User' },
      { path: 'receivedFriendRequest', model: 'User' },
      { path: 'sentFriendRequest', model: 'User' },
    ])
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

exports.sendFriendRequestController = (req, res, next) => {
  // first we find the user to whom friend request is sent and update it's DB.
  User.findById(req.body.userId)
    .then((user1) => {
      if (!user1) {
        const err = new Error(`user not found, please try again.`);
        err.status = 404;
        next(err);
      } else {
        if (user1.friendList.indexOf(req.user._id) !== -1) {
          const err = new Error(`You both are already friends.`);
          err.status = 403;
          next(err);
        }
        if (user1.receivedFriendRequest.indexOf(req.user._id) !== -1) {
          const err = new Error(`You've already sent the friend request.`);
          err.status = 403;
          next(err);
        }
        if (user1.sentFriendRequest.indexOf(req.user._id) !== -1) {
          const err = new Error(`You've already received the friend request.`);
          err.status = 403;
          next(err);
        } else {
          user1.receivedFriendRequest.push(req.user._id);
          user1
            .save()
            .then((user1) => {
              // now find the user, who has sent the friend request and update it's DB
              User.findById(req.user._id)
                .then((user2) => {
                  if (!user2) {
                    const err = new Error(`user not found, please try again.`);
                    err.status = 404;
                    next(err);
                  } else {
                    if (user2.friendList.indexOf(req.body.userId) !== -1) {
                      const err = new Error(`You both are already friends.`);
                      err.status = 403;
                      next(err);
                    }
                    if (
                      user2.sentFriendRequest.indexOf(req.body.userId) !== -1
                    ) {
                      const err = new Error(
                        `You've already sent the friend request.`
                      );
                      err.status = 403;
                      next(err);
                    }
                    if (
                      user2.receivedFriendRequest.indexOf(req.body.userId) !==
                      -1
                    ) {
                      const err = new Error(
                        `You've already received the friend request.`
                      );
                      err.status = 403;
                      next(err);
                    } else {
                      user2.sentFriendRequest.push(req.body.userId);
                      user2
                        .save()
                        .then((user2) => {
                          res.statusCode = 200;
                          res.setHeader('Content-Type', 'application/json');
                          res.json({
                            user: user1,
                            message: 'Friend request sent successfully.',
                          });
                        })
                        .catch((err) => next(err));
                    }
                  }
                })
                .catch((err) => nexxt(err));
            })
            .catch((err) => next(err));
        }
      }
    })
    .catch((err) => next(err));
};

exports.cancelFriendRequestController = (req, res, next) => {
  // first we find the user whose friend request is to be cancelled and update it's DB.
  User.findById(req.body.userId)
    .then((user1) => {
      if (!user1) {
        const err = new Error(`user not found, please try again.`);
        err.status = 404;
        next(err);
      } else {
        if (user1.friendList.indexOf(req.user._id) !== -1) {
          const err = new Error(`You both are already friends.`);
          err.status = 403;
          next(err);
        }
        if (user1.receivedFriendRequest.indexOf(req.user._id) === -1) {
          const err = new Error(`Friend request not sent yet.`);
          err.status = 403;
          next(err);
        } else {
          user1.receivedFriendRequest.splice(
            user1.receivedFriendRequest.indexOf(req.user._id),
            1
          );
          user1
            .save()
            .then((user1) => {
              // now find the user, who want to cancel the friend request and update it's DB
              User.findById(req.user._id)
                .then((user2) => {
                  if (!user2) {
                    const err = new Error(`user not found, please try again.`);
                    err.status = 404;
                    next(err);
                  } else {
                    if (user2.friendList.indexOf(req.body.userId) !== -1) {
                      const err = new Error(`You both are already friends.`);
                      err.status = 403;
                      next(err);
                    }
                    if (
                      user2.sentFriendRequest.indexOf(req.body.userId) === -1
                    ) {
                      const err = new Error(
                        `You haven't sent the friend request yet.`
                      );
                      err.status = 403;
                      next(err);
                    } else {
                      user2.sentFriendRequest.splice(
                        user2.sentFriendRequest.indexOf(req.body.userId),
                        1
                      );
                      user2
                        .save()
                        .then((user2) => {
                          res.statusCode = 200;
                          res.setHeader('Content-Type', 'application/json');
                          res.json({
                            user: user1,
                            message: 'Friend request cancelled successfully.',
                          });
                        })
                        .catch((err) => next(err));
                    }
                  }
                })
                .catch((err) => nexxt(err));
            })
            .catch((err) => next(err));
        }
      }
    })
    .catch((err) => next(err));
};

exports.acceptFriendRequestController = (req, res, next) => {
  // first we find the user whose friend request is to be accepted and update it's DB.
  User.findById(req.body.userId)
    .then((user1) => {
      if (!user1) {
        const err = new Error(`user not found, please try again.`);
        err.status = 404;
        next(err);
      } else {
        if (user1.friendList.indexOf(req.user._id) !== -1) {
          const err = new Error(`You both are already friends.`);
          err.status = 403;
          next(err);
        }
        if (user1.sentFriendRequest.indexOf(req.user._id) === -1) {
          const err = new Error(
            `You haven't received this friend request yet.`
          );
          err.status = 403;
          next(err);
        } else {
          user1.sentFriendRequest.splice(
            user1.sentFriendRequest.indexOf(req.user._id),
            1
          );
          user1.friendList.push(req.user._id);
          user1
            .save()
            .then((user1) => {
              // now find the user, who want to accept the friend request and update it's DB
              User.findById(req.user._id)
                .then((user2) => {
                  if (!user2) {
                    const err = new Error(`user not found, please try again.`);
                    err.status = 404;
                    next(err);
                  } else {
                    if (user2.friendList.indexOf(req.body.userId) !== -1) {
                      const err = new Error(`You both are already friends.`);
                      err.status = 403;
                      next(err);
                    }
                    if (
                      user2.receivedFriendRequest.indexOf(req.body.userId) ===
                      -1
                    ) {
                      const err = new Error(
                        `You haven't received this friend request yet.`
                      );
                      err.status = 403;
                      next(err);
                    } else {
                      user2.receivedFriendRequest.splice(
                        user2.receivedFriendRequest.indexOf(req.body.userId),
                        1
                      );
                      user2.friendList.push(req.body.userId);
                      user2
                        .save()
                        .then((user2) => {
                          res.statusCode = 200;
                          res.setHeader('Content-Type', 'application/json');
                          res.json({
                            user: user1,
                            message: 'Friend request accepted successfully.',
                          });
                        })
                        .catch((err) => next(err));
                    }
                  }
                })
                .catch((err) => nexxt(err));
            })
            .catch((err) => next(err));
        }
      }
    })
    .catch((err) => next(err));
};

exports.rejectFriendRequestController = (req, res, next) => {
  // first we find the user whose friend request is to be accepted and update it's DB.
  User.findById(req.body.userId)
    .then((user1) => {
      if (!user1) {
        const err = new Error(`user not found, please try again.`);
        err.status = 404;
        next(err);
      } else {
        if (user1.friendList.indexOf(req.user._id) !== -1) {
          const err = new Error(`You both are already friends.`);
          err.status = 403;
          next(err);
        }
        if (user1.sentFriendRequest.indexOf(req.user._id) === -1) {
          const err = new Error(
            `You haven't received this friend request yet.`
          );
          err.status = 403;
          next(err);
        } else {
          user1.sentFriendRequest.splice(
            user1.sentFriendRequest.indexOf(req.user._id),
            1
          );
          user1
            .save()
            .then((user1) => {
              // now find the user, who want to accept the friend request and update it's DB
              User.findById(req.user._id)
                .then((user2) => {
                  if (!user2) {
                    const err = new Error(`user not found, please try again.`);
                    err.status = 404;
                    next(err);
                  } else {
                    if (user2.friendList.indexOf(req.body.userId) !== -1) {
                      const err = new Error(`You both are already friends.`);
                      err.status = 403;
                      next(err);
                    }
                    if (
                      user2.receivedFriendRequest.indexOf(req.body.userId) ===
                      -1
                    ) {
                      const err = new Error(
                        `You haven't received this friend request yet.`
                      );
                      err.status = 403;
                      next(err);
                    } else {
                      user2.receivedFriendRequest.splice(
                        user2.receivedFriendRequest.indexOf(req.body.userId),
                        1
                      );
                      user2
                        .save()
                        .then((user2) => {
                          res.statusCode = 200;
                          res.setHeader('Content-Type', 'application/json');
                          res.json({
                            user: user1,
                            message: 'Friend request rejected successfully.',
                          });
                        })
                        .catch((err) => next(err));
                    }
                  }
                })
                .catch((err) => nexxt(err));
            })
            .catch((err) => next(err));
        }
      }
    })
    .catch((err) => next(err));
};

exports.unFriendRequestController = (req, res, next) => {
  // first we find the user who's to be unfriend and update it's DB.
  User.findById(req.body.userId)
    .then((user1) => {
      if (!user1) {
        const err = new Error(`user not found, please try again.`);
        err.status = 404;
        next(err);
      } else {
        if (user1.friendList.indexOf(req.user._id) === -1) {
          const err = new Error(`You both are not friends.`);
          err.status = 403;
          next(err);
        } else {
          user1.friendList.splice(user1.friendList.indexOf(req.user._id), 1);
          user1
            .save()
            .then((user1) => {
              // now find the user, who want to accept the friend request and update it's DB
              User.findById(req.user._id)
                .then((user2) => {
                  if (!user2) {
                    const err = new Error(`user not found, please try again.`);
                    err.status = 404;
                    next(err);
                  } else {
                    if (user2.friendList.indexOf(req.body.userId) === -1) {
                      const err = new Error(`You both are not friends.`);
                      err.status = 403;
                      next(err);
                    } else {
                      user2.friendList.splice(
                        user2.friendList.indexOf(req.body.userId),
                        1
                      );
                      user2
                        .save()
                        .then((user2) => {
                          res.statusCode = 200;
                          res.setHeader('Content-Type', 'application/json');
                          res.json({
                            user: user1,
                            message: `${user1.username} unfriended successfully.`,
                          });
                        })
                        .catch((err) => next(err));
                    }
                  }
                })
                .catch((err) => nexxt(err));
            })
            .catch((err) => next(err));
        }
      }
    })
    .catch((err) => next(err));
};
