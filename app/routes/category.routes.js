const controller = require('../controller/category.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/category/create", controller.createCategory);

    app.post("/api/category/update", controller.updateCategory);

    app.get("/api/category/delete/:id", controller.deleteCategory);

    app.get("/api/category/get/:category/:limit", controller.categories);

    app.get("/api/category/name/:category/:limit/:name", controller.categoryByName)
}