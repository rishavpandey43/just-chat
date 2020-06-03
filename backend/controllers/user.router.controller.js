const crypto = require('crypto');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const dotenv = require('dotenv');

const User = require('../models/user.model'); // import User Schema
const Token = require('../models/token.model');

const authenticate = require('../middlewares/authenticate');
const helpers = require('../utils/helpers');

// configure dotenv to access environment variables
dotenv.config();

const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  // auth: {
  //   xoauth2: xoauth2.createXOAuth2Generator({
  //     user: process.env.GMAIL_ADDRESS,
  //     clientId: process.env.GMAIL_CLIENT_ID,
  //     clientSecret: process.env.GMAIL_CLIENT_SECRET,
  //     refreshToken: process.env,
  //   }),
  // },
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
  // auth: {
  //   type: 'OAuth2',
  //   user: process.env.GMAIL_ADDRESS, // email you are using with nodemailer
  //   // pass: process.env.GMAIL_PASSWORD, // email password
  //   clientId: process.env.GMAIL_CLIENT_ID,
  //   clientSecrect: process.env.GMAIL_CLIENT_SECRET,
  //   refreshToken: process.env.GMAIL_CLIENT_REFRESH_TOKEN,
  //   accessToken: process.env.GMAIL_CLIENT_ACCESS_TOKEN,
  // },
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
            const activationLink = `${req.headers.origin}/#/user/activate-account/${token.token}`;
            let mailOptions = {
              from: 'justchat0007@gmail.com',
              to: user.email,
              subject: 'Just Chat Account activation',
              html: `
                <html>
                  <h3>Hello ${user.username}</h3>
                  <p>Thanks for trying our chat application. You're just one step away to complete your registration.</p>
                  <p>Click the following button to confirm and activate your new account</p>
                  <p> <strong>Note:</strong> Link will automatically expire in 10 minutes.</p>
                  <button style="border: 1px solid #c90bce; background-color: #c90bce; color: #fff; border-radius: 2rem; padding: 0.4rem 2rem;"><a href="${activationLink}">Verify now</a></button>
                  <br/>
                  <p>If the above button is not working, try copying and pasting <strong>${activationLink}</strong> into the address bar of your web browser </p>
                  <br/>
                  <br/>
                </html>
              `,
            };
            smtpTransport.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log('error-', error);
                // * here delete the created account, if mail can't be sent
                User.findByIdAndDelete(user._id)
                  .then(() => {
                    const err = new Error(`Internal Server Error`);
                    err.status = 500;
                    next(err);
                  })
                  .catch((err) => next(err));
              } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                  message: `A activation email has been sent to ${user.email}.`,
                });
              }
            });
          })
          .catch((err) => next(err));
      }
    }
  );
};

exports.resendActivationLink = (req, res, next) => {
  User.findOne({
    email: req.query.email,
    username: req.query.username,
  }).then((user) => {
    if (!user) {
      const err = new Error(
        `No user found with given detail, try with correct credentials.`
      );
      err.status = 404;
      next(err);
    } else {
      // check it's verified or not
      if (user.verified) {
        const err = new Error(
          `${user.username} is already verified, try logging in.`
        );
        err.status = 400;
        next(err);
      } else {
        // now create token
        Token.create({
          userId: user._id,
          token: crypto.randomBytes(16).toString('hex'),
        })
          .then((token) => {
            const activationLink = `${req.headers.origin}/#/user/activate-account/${token.token}`;
            let mailOptions = {
              from: 'justchat0007@gmail.com',
              to: user.email,
              subject: 'Just Chat Account Activation',
              html: `
                    <html>
                      <h3>Hello ${user.username}</h3>
                      <p>Thanks for trying our chat application. You're just one step away to complete your registration.</p>
                      <p>Click the following button to confirm and activate your new account</p>
                      <p> <strong>Note:</strong> Link will automatically expire in 10 minutes.</p>
                      <button style="border: 1px solid #c90bce; background-color: #c90bce; color: #fff; border-radius: 2rem; padding: 0.4rem 2rem;"><a href="${activationLink}">Verify now</a></button>
                      <br/>
                      <p>If the above button is not working, try copying and pasting <strong>${activationLink}</strong> into the address bar of your web browser </p>
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
                  message: `A activation email has been sent to ${user.email}.`,
                });
              }
            });
          })
          .catch((err) => next(err));
      }
    }
  });
};

exports.userActivationController = (req, res, next) => {
  Token.findOne({
    token: req.query.token,
  })
    .then((token) => {
      if (!token) {
        let error = new Error(
          `Token is either expired or invalid, You can request for new token to activate your account`
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
              } else {
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
        const activationLink = `${req.headers.origin}/#/user/activate-account/${token.token}`;
        let mailOptions = {
          from: 'justchat0007@gmail.com',
          to: user.email,
          subject: 'Just Chat Account Activation',
          html: `
                <html>
                  <h3>Hello ${user.username}</h3>
                  <p>Thanks for trying our chat application. You're just one step away to complete your registration.</p>
                  <p>Click the following button to confirm and activate your new account</p>
                  <p> <strong>Note:</strong> Link will automatically expire in 10 minute.</p>
                  <button style="border: 1px solid #c90bce; background-color: #c90bce; color: #fff; border-radius: 2rem; padding: 0.4rem 2rem;"><a href="${activationLink}">Verify now</a></button>
                  <br/>
                  <p>If the above button is not working, try copying and pasting <strong>${activationLink}</strong> into the address bar of your web browser </p>
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
