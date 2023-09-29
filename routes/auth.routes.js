module.exports = app => {
    const controller = require("../controllers/auth.controller");
    var router = require("express").Router();


    router.post("/signin", controller.signin);

    app.use('/api/auth', router);
};