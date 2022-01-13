const db = require("../model");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  if (req.body.username) {
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Username is already in use!"
        });
      }
    });
  }
  // Email
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Email is already in use!"
      });
      return;
    }
    next();
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  next();
};

checkUpdateDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findAll({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user.length > 1) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    } else if (user.length == 1) {
      if (user[0].id != req.userId) {
        res.status(400).send({
          message: "Failed! Username is already in use!"
        });
        return;
      }
    }

    // Email
    User.findAll({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user.length > 1) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      } else if (user.length == 1) {
        if (user[0].id != req.userId) {
          res.status(400).send({
            message: "Failed! Email is already in use!"
          });
          return;
        }
      }

      next();
    });
  });
};

checkUpdateDuplicatePhoneNo = (req, res, next) => {
  User.findAll({
    where: {
      phoneNo: req.body.phoneNo
    }
  }).then(user => {
    if (user.length > 1) {
      res.status(400).send({
        message: "Failed! Phone Number is already in use!"
      });
      return;
    } else if (user.length == 1) {
      if (user[0].id != req.userId) {
        res.status(400).send({
          message: "Failed! Phone Number is already in use!"
        });
        return;
      }
    }
    next();
  })
};

checkDuplicatePhoneNo = (req, res, next) => {
  User.findOne({
    where: {
      phoneNo: req.body.phoneNo
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Phone Number is already in use!"
      });
      return;
    }
    next();
  })
};
const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
  checkUpdateDuplicatePhoneNo: checkUpdateDuplicatePhoneNo,
  checkUpdateDuplicateUsernameOrEmail: checkUpdateDuplicateUsernameOrEmail,
  checkDuplicatePhoneNo: checkDuplicatePhoneNo
};

module.exports = verifySignUp;