const db = require("../model");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const {
  role,
  ROLES
} = require("../model");

var salt = bcrypt.genSaltSync(8);

exports.signupAdmin = (req, res) => {
  //save user to database
  User.create({
      email: req.body.email,
      password: bcrypt.hashSync(config.adminDefaultPassword, salt)
    }).then((user) => {
      Role.findAll({
        where: {
          name: {
            [Op.or]: ['admin']
          }
        }
      }).then(role => {
        var token = jwt.sign({
          id: user.id
        }, config.secret, {
          expiresIn: 86400 //24 hours
        })
        user.setRoles(role).then(() => {
          res.status(200).send({
            success: true,
            id: user.id,
            username: user.username,
            email: user.email,
            phoneNo: user.phoneNo,
            firstName: user.firstName,
            lastName: user.lastName,
            nationality: user.nationality,
            address: user.address,
            image: user.image,
            roles: role,
            accessToken: token,
            message: "Admin registered successfully"
          })
        });
      })

    })
    .catch(err => {
      console.log(err.message);
    })
};

exports.signupAuthor = (req, res) => {
  // Save User to Database
  User.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt)
    })
    .then(user => {
      Role.findAll({
        where: {
          name: {
            [Op.or]: ['author']
          }
        }
      }).then(roles => {
        user.setRoles(roles).then(() => {
          res.status(200).send({
            success: true,
            result: {
              id: user.id,
              username: user.username,
              email: user.email,
              phoneNo: user.phoneNo,
              firstName: user.firstName,
              lastName: user.lastName,
              nationality: user.nationality,
              address: user.address,
              image: user.image,
              roles: roles,
              // accessToken: token
            },
            message: "Author is registered successfully"
          });
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message,
        success: false
      });
    });
};
exports.signupEditor = (req, res) => {
  // Save User to Database
  User.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt)
    })
    .then(user => {
      Role.findAll({
        where: {
          name: {
            [Op.or]: ['editor']
          }
        }
      }).then(roles => {
        user.setRoles(roles).then(() => {
          res.status(200).send({
            success: true,
            result: {
              id: user.id,
              username: user.username,
              email: user.email,
              phoneNo: user.phoneNo,
              firstName: user.firstName,
              lastName: user.lastName,
              nationality: user.nationality,
              address: user.address,
              image: user.image,
              roles: roles,
              // accessToken: token
            },
            message: "Athour registered successfully"
          });
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message,
        success: false
      });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      [Op.or]: [{
          username: {
            [Op.eq]: req.body.param
          }
        },
        {
          email: {
            [Op.eq]: req.body.param
          }
        },
        {
          phoneNo: {
            [Op.eq]: req.body.param
          }
        }
      ]
    }
  }).then(user => {
    if (!user) {
      return res.status(200).send({
        message: "USER_NOT_FOUND",
        success: false
      });
    }
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(200).send({
        message: "Invalid Password",
        success: false,
        accessToken: null
      });
    }
    var token = jwt.sign({
      id: user.id
    }, config.secret, {
      expiresIn: 86400 //24 hours
    });
    // var authorities = [];
    user.getRoles().then(role => {
      role.forEach(role => {
        role.push("ROLE_" + role.name.toUpperCase());
      });
    });
    res.status(200).send({
      success: true,
      id: user.id,
      username: user.username,
      email: user.email,
      phoneNo: user.phoneNo,
      firstName: user.firstName,
      lastName: user.lastName,
      nationality: user.nationality,
      address: user.address,
      image: user.image,
      roles: role,
      accessToken: token
    });

  }).catch(err => {
    return res.status(404).send({
      message: err.message,
      success: false
    });
  })
}

exports.UpdatePassword = (req, res) => {
  User.findOne({
    where: {
      id: req.userId
    }
  }).then(user => {
    if (!user) {
      return res.status(200).send({
        message: "USER_NOT_FOUND",
        success: false
      });
    }
    var passwordIsValid = bcrypt.compareSync(
      req.body.oldPassword,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(200).send({
        message: 'Old password is incorrect!!!',
        success: false
      });
    }
    User.update({
      username: user.username,
      email: user.email,
      phoneNo: user.phoneNo,
      firstName: user.firstName,
      lastName: user.lastName,
      nationality: user.nationality,
      address: user.address,
      image: user.image,
      password: bcrypt.hashSync(req.body.newPassword, salt)
    }, {
      where: {
        id: parseInt(req.userId)
      }
    })
  }).catch(err => {

  })
}