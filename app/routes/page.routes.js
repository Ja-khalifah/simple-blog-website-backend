const controller = require('../controller/page.controller');
const authJwt = require('../middleware/authjwt');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/page/create", [authJwt.verifyToken, authJwt.isAuthorOrAdmin], controller.createPage);

    app.post("/api/page/update", controller.updatePage);

    app.get("/api/page/get/:page/:limit", controller.ReadingPage);

    app.get("/api/page/delete/:id", controller.deletePage);

    app.get("/api/page/read/:page/:limit/:title", controller.ReadPagebyTitle)

}