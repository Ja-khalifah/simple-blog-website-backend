module.exports = (sequelize, Sequelize) => {
    const Page = sequelize.define("page", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        publish: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        tag: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    return Page;
}