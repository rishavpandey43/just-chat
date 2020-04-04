const bcrypt = require("bcryptjs");

const User = require("../models/user.model"); // import message group schema
const Group = require("../models/group.model"); // import message group schema

const createGroupController = (req, res, next) => {
  Group.findOne({ name: req.body.name })
    .then(group => {
      if (group) {
        let err = new Error(
          `Group with this name already exist, please try with another name`
        );
        err.status = 409;
        next(err);
      } else {
        if (req.body.private) {
          if (req.body.password === "") {
            let err = new Error(
              `Please, enter a password to protect your private group`
            );
            err.status = 404;
            next(err);
          } else {
            bcrypt
              .genSalt(10)
              .then(salt => {
                bcrypt
                  .hash(req.body.password, salt)
                  .then(hashPassword => {
                    Group.create({
                      name: req.body.name,
                      ownerId: req.user._id,
                      private: req.body.private,
                      password: hashPassword
                    })
                      .then(group => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json({
                          groupName: group.name,
                          message: `Group has been successfully created`
                        });
                      })
                      .catch(err => next(err));
                  })
                  .catch(err => next(err));
              })
              .catch(err => next(err));
          }
        } else {
          Group.create({
            name: req.body.name,
            ownerId: req.user._id,
            private: req.body.private
          })
            .then(group => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json({
                groupName: group.name,
                message: `Group has been successfully created`
              });
            })
            .catch(err => next(err));
        }
      }
    })
    .catch(err => next(err));
};

const joinGroupController = (req, res, next) => {
  // check if the requested group is private, and handle the request of private group
  if (req.body.private) {
    Group.findOne({ name: req.body.name })
      .then(group => {
        // reject request, if group not found
        if (!group) {
          let err = new Error(
            `Group  not found, please join valid group our create a new one`
          );
          err.status = 404;
          next(err);
        }
        // handle if user has requested as a group to be private, instead of being public original
        if (!group.private) {
          if (group.ownerId.equals(req.user._id)) {
            let err = new Error(
              `You're already the owner of this group, you can't join again.`
            );
            err.status = 409;
            next(err);
          }
          if (group.members.indexOf(req.user._id) !== -1) {
            let err = new Error(`You're already the member of this group.`);
            err.status = 409;
            next(err);
          } else {
            group.members.push(req.user._id);
            group
              .save()
              .then(group => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({
                  groupName: group.name,
                  message: `You've successfully joined the group`
                });
              })
              .catch(err => next(err));
          }
        }
        // now handle the private group
        else {
          bcrypt
            .compare(req.body.password, group.password)
            .then(validPassword => {
              // accept the request, if password is valid
              if (validPassword) {
                if (group.ownerId.equals(req.user._id)) {
                  let err = new Error(
                    `You're already the owner of this group, you can't join again.`
                  );
                  err.status = 409;
                  next(err);
                }
                if (group.members.indexOf(req.user._id) !== -1) {
                  let err = new Error(
                    `You're already the member of this group.`
                  );
                  err.status = 409;
                  next(err);
                } else {
                  group.members.push(req.user._id);
                  group
                    .save()
                    .then(group => {
                      res.statusCode = 200;
                      res.setHeader("Content-Type", "application/json");
                      res.json({
                        groupName: group.name,
                        message: `You've successfully joined the group`
                      });
                    })
                    .catch(err => next(err));
                }
              }
              // reject the request, if password is valid
              else {
                let err = new Error(
                  `Please, enter valid password to join the group`
                );
                err.status = 401;
                next(err);
              }
            })
            .catch(err => next(err));
        }
      })
      .catch(err => next(err));
  }
  // handle the request of public groups
  else {
    Group.findOne({ name: req.body.name })
      .then(group => {
        // reject request, if group not found
        if (!group) {
          let err = new Error(
            `Group  not found, please join valid group our create a new one`
          );
          err.status = 404;
          next(err);
        }
        // reject the request, where user tried to join private group with wrong data(req.body.private: false)
        if (group.private) {
          let err = new Error(
            `Please, enter valid detail to join the requested private group`
          );
          err.status = 401;
          next(err);
        }
        // now handle the public group
        else if (!group.private) {
          if (group.ownerId.equals(req.user._id)) {
            let err = new Error(
              `You're already the owner of this group, you can't join again.`
            );
            err.status = 409;
            next(err);
          }
          if (group.members.indexOf(req.user._id) !== -1) {
            let err = new Error(`You're already the member of this group.`);
            err.status = 409;
            next(err);
          } else {
            group.members.push(req.user._id);
            group
              .save()
              .then(group => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({
                  groupName: group.name,
                  message: `You've successfully joined the group`
                });
              })
              .catch(err => next(err));
          }
        }
      })
      .catch(err => next(err));
  }
};

const getGroupListController = (req, res, next) => {
  // find only those group,in which user is member
  Group.find({ $or: [{ ownerId: req.user._id }, { members: req.user._id }] })
    .populate({ path: "ownerId members", model: User })
    .then(groups => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        groups
      });
    })
    .catch(err => next(err));
};

exports.createGroupController = createGroupController;
exports.getGroupListController = getGroupListController;
exports.joinGroupController = joinGroupController;
