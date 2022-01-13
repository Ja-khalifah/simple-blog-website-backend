const controller = require('../controller/comment.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/comment/create", controller.createComment);

    app.post("/api/comment/update", controller.updateComment);

    app.get("/api/comment/get/:comment/:limit", controller.ReadComment);

    app.get("/api/comment/delete/:id", controller.deleteComment);

    app.get("/api/comment/read/:comment/:limit/:content", controller.ReadCommentByContent)

}