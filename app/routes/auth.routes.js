const controller = require('../controller/auth.controller');
const authJwt = require('../middleware/authjwt');
const verifySignUp = require('../middleware/verifySignup');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/auth/signup-admin", [authJwt.verifyToken, authJwt.isAdmin],
        controller.signupAdmin);

    app.post("/api/auth/signup-author", [
        verifySignUp.checkDuplicateUsernameOrEmail
    ], controller.signupAuthor);

    app.post("/api/auth/signup-editor", controller.signupEditor);

    app.post("/api/auth/signin", [authJwt.isEditorOrAdmin], controller.signin);

    app.post("/api/auth/UpdatePassword", controller.UpdatePassword);

}