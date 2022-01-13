const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../model");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
      success: false
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
        success: false
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    try {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({
          message: "Require Admin Role!",
          success: false
        });
        return;
      });
    } catch (err) {
      res.status(403).send({
        message: "Require Admin Role!",
        success: false
      });
      return;
    }
  });
};

isAuthor = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    try {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "author") {
            next();
            return;
          }
        }

        res.status(403).send({
          message: "Require Author Role!",
          success: false
        });
      });
    } catch (err) {
      res.status(403).send({
        message: "Require Author Role!",
        success: false
      });
      return;
    }
  });
};

isEditor = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    try {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "editor") {
            next();
            return;
          }
        }

        res.status(403).send({
          message: "Require Editor Role!",
          success: false
        });
      });
    } catch (err) {
      res.status(403).send({
        message: "Require Editor Role!",
        success: false
      });
      return;
    }
  });
};

isAuthorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    try {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "author") {
            next();
            return;
          }

          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({
          message: "Require Author or Admin Role!",
          success: false
        });
      });
    } catch (err) {
      res.status(403).send({
        message: "Require Author or Admin Role!",
        success: false
      });
      return;
    }
  });
};

isEditorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    try {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "editor") {
            next();
            return;
          }

          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({
          message: "Require Editor or Admin Role!",
          success: false
        });
      });
    } catch (err) {
      res.status(403).send({
        message: "Couldnt find  Editor or Admin Role!",
        success: false
      });
      return;
    }
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isAuthor: isAuthor,
  isAuthorOrAdmin: isAuthorOrAdmin,
  isEditorOrAdmin: isEditorOrAdmin
};
module.exports = authJwt;