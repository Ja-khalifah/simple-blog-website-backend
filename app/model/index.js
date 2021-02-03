const config = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            aquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {}

db.Sequelize =  Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.page = require("./page.model.js")(sequelize, Sequelize);
db.post = require("./post.model.js")(sequelize, Sequelize);
db.comment = require("./comment.model.js")(sequelize, Sequelize);

/**
 * many to may relationship between users and roles table
 * 1. users
 * 2. roles
 * 3. user_roles
 */
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "UserId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});


/**
 * one to many relationhip between category and post. A category has many post.
 * 1. category
 * 2. post
 */
db.category.hasMany(db.post);

/**
 * one to many relationhip between category and page. A category has many page.
 * 1. category
 * 2. page
 */
db.category.hasMany(db.page);

/**]
 * one to many relationship between post and comment. a post has many comment
 * 1. post
 * 2. comment
 */
db.post.hasMany(db.comment);


//roles
db.ROLES = ["user", "admin", "author"];

module.exports = db;