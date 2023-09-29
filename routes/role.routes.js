module.exports = app => {
    const roles = require("../controllers/roles.controller.js");  

    var router = require("express").Router();
   
    router.post("/create", roles.create);
    
    router.get("/getall", roles.findAll); 
  
    router.get("/getbyid/:id", roles.findOne);
 
    router.put("/update/:id", roles.update);

    router.delete("/delete/:id", roles.delete);
   
    router.delete("/deleteall", roles.deleteAll);

    app.use('/api/roles', router);

};