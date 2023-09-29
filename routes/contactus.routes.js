module.exports = app => {
    const contactus = require("../controllers/contactus.controller.js");
    const { ContactUsFields } = require('../commonHelper/common.messages');
    const { checkRequiredFields } = require('../commonHelper/common.functions')

    var router = require("express").Router();

    router.post("/create", checkRequiredFields(ContactUsFields) ,contactus.create); 
    
    router.get("/getall", contactus.findAll);

    router.get("/getbyid/:id", contactus.findOne);

    router.put("/update/:id", checkRequiredFields(ContactUsFields), contactus.update);

    router.delete("/delete/:id", contactus.delete);

    router.delete("/deleteall", contactus.deleteAll);

    app.use('/api/contactus', router);

};