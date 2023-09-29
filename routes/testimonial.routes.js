module.exports = app => {
    const testimonial = require("../controllers/testimonial.controller.js");   
    let router = require("express").Router();
    const { createMulter } = require('../middleware/upload.js');
    const uploadDestination = './uploads/testimonial/';
    const apiController = 'testimonial';

    // Create a Multer upload instance with the custom destination
    const upload = createMulter(uploadDestination, apiController);

    router.post("/create", upload.single("Image"),testimonial.create);

    router.get("/getall", testimonial.findAll);

    router.get("/getbyid/:id", testimonial.findOne);

    router.put("/update/:id", upload.single("Image"), testimonial.update);

    router.delete("/delete/:id", testimonial.delete);

    router.delete("/deleteall", testimonial.deleteAll);

    router.get("/getimage/:id", testimonial.getImage);

    app.use('/api/testimonial', router);

};