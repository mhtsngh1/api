module.exports = app => {
    const blog = require("../controllers/blog.controller.js");
    let router = require("express").Router();
    const { createMulter } = require('../middleware/upload.js');
    const uploadDestination = './uploads/blogImages/';
    const apiController = 'blog';
    const { BlogFields } = require('../commonHelper/common.messages');
    const { checkRequiredFieldsWithImages } = require('../commonHelper/common.functions')

    // Create a Multer upload instance with the custom destination
    const upload = createMulter(uploadDestination, apiController,true,'image');

    router.post("/create", upload.single("Image"), checkRequiredFieldsWithImages(BlogFields), blog.create);

    router.get("/getall", blog.findAll);

    router.get("/getbyid/:id", blog.findOne);

    router.put("/update/:id", upload.single("Image"), blog.update);

    router.delete("/delete/:id", blog.delete);

    router.delete("/deleteall", blog.deleteAll);

    router.get("/getimage/:id", blog.getImage);
    
    app.use('/api/blog', router);

};