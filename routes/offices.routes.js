module.exports = app => {
    const office = require("../controllers/offices.controller");
    let router = require("express").Router();
    const { createMulter } = require('../middleware/upload.js');
    const uploadDestination = './uploads/officeImages/';
    const apiController = 'Office';
    const { OfficeFields } = require('../commonHelper/common.messages');
    const { checkRequiredFields } = require('../commonHelper/common.functions')

    // Create a Multer upload instance with the custom destination
    const upload = createMulter(uploadDestination, apiController, true, 'image');

    router.post("/create", upload.single("Image"), checkRequiredFields(OfficeFields), office.create);

    router.get("/getall", office.findAll);

    router.get("/getbyid/:id", office.findOne);

    router.put("/update/:id", upload.single("Image"), office.update);

    router.delete("/delete/:id", office.delete);

    router.delete("/deleteall", office.deleteAll);

    router.get("/getimage/:id", office.getImage);

    app.use('/api/office', router);

};