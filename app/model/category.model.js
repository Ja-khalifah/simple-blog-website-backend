module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        detail: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        tag: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    return Category;
}