module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: ''
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: ''
        },
        phoneNo: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: ''
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: ''
        },
        nationality: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: ''
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: ''
        }
    });
    return User;
}