const controller = require('../controller/post.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/post/create", controller.createPost);

    app.post("/api/post/update", controller.updatePost);

    app.get("/api/post/get/:post/:limit", controller.ReadingPost);

    app.get("/api/post/delete/:id", controller.deletePost);

    app.get("/api/post/read/:post/:limit/:title", controller.ReadPostbyTitle)

}