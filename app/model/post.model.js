module.exports = (sequelize,Sequelize) => {
    const Post = sequelize.define("post", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: true
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
    return Post;
}