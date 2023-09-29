module.exports = app => {
    const user = require("../controllers/user.controller.js");
    const { verifyToken } = require("../middleware/authJwt.js");


    var router = require("express").Router();
   

    router.post("/create", user.create);

    //router.get("/getall", verifyToken ,user.findAll);
    router.get("/getall", user.findAll);

    router.get("/getbyid/:id", user.findOne);

    router.put("/update/:id", user.update);

    router.delete("/delete/:id", user.delete);

    router.delete("/deleteall", user.deleteAll);

    app.use('/api/user', router);

};