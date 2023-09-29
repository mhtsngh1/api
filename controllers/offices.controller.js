const db = require("../models");
const Office = db.offices;
const fs = require('fs');
const path = require('path');
const { deleteFile, deleteAllFile } = require('../middleware/deletefile.js');
const { sendResponse } = require('../commonHelper/response.model');
const apiController = 'Office';


exports.create = (req, res) => {
    const office = new Office({
        OfficeName: req.body.OfficeName,
        Address: req.body.Address,
        Email: req.body.Email,
        PhoneNumber: req.body.PhoneNumber,
        IsActive: false,
        ImageName: (req.file) ? req.file.originalname : null,       
        ImageUniqueName: (req.file) ? req.file.filename : null
    });

    // Save Tutorial in the database
    office
        .save(office)
        .then(data => {
            sendResponse(res, data, 201, apiController, null, req.method);
        })
        .catch(err => {
            sendResponse(res, [], 500, apiController, err.message, req.method);
        });
    // });
};

exports.findAll = (req, res) => {
    //let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    let ImgUrl = req.protocol + '://' + req.get('host');

    Office.find()
        .then(data => {
            if (!Array.isArray(data)) {
                return sendResponse(res, data, 404, apiController, null, req.method);
            }

            if (data.length === 0) {
                return sendResponse(res, data, 404, apiController, null, req.method);
            }

            const modifiedData = data.map(item => {
                const imageUrl = (item.ImageUniqueName == null) ? null : ImgUrl + `/uploads/officeImages/${item.ImageUniqueName}`;

                return {
                    ...item._doc,
                    ImageURL: imageUrl,
                };
            });
            sendResponse(res, modifiedData, 200, apiController, null, req.method);
        })
        .catch(err => {
            return sendResponse(res, [], 500, apiController, err.message, req.method);

        });
};

exports.findOne = (req, res) => {
    let ImgUrl = req.protocol + '://' + req.get('host');
    const id = req.params.id;

    Office.findById(id)
        .then(data => {
            if (!data) {
                return sendResponse(res, [], 404, apiController, null, req.method);
            }
            else {
                data['ImageURL'] = (data.ImageUniqueName == null) ? null : ImgUrl + `/uploads/officeImages/${data.ImageUniqueName}`;

                sendResponse(res, data, 200, apiController, null, req.method);
            }
        })
        .catch(err => {
            return sendResponse(res, [], 500, apiController, err.message, req.method);

        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return sendResponse(res, [], 400, apiController);
    }

    const id = req.params.id;
    Testimonial.findById(id)
        .then(data => {
            if (!data) {
                return sendResponse(res, [], 404, apiController);
            }
            if (req.file) {
                if (data.ImageUniqueName) {
                    const filePath = path.join(__dirname, '../uploads/testimonial', data.ImageUniqueName);
                    deleteFile(filePath);
                }
                data.ImageUniqueName = req.file.filename;
                data.ImageName = req.file.originalname;
            }
            // Update fields in the testimonial document
            data.Name = req.body.Name;
            data.Title = req.body.Title;
            data.Description = req.body.Description;


            // Save the updated testimonial
            data.save()
                .then(updatedTestimonial => {
                    sendResponse(res, updatedTestimonial, 200, apiController);
                })
                .catch(err => {
                    sendResponse(res, [], 500, apiController);
                });
        })
        .catch(err => {
            sendResponse(res, [], 500, apiController);
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Office.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                sendResponse(res, [], 404, apiController);
                //res.status(404).send({
                //    message: `Cannot delete Testimonial with id=${id}. Maybe Testimonial was not found!`
                //});
            } else {
                const filePath = path.join(__dirname, '../uploads/officeImages/', data.ImageUniqueName);
                deleteFile(filePath);
                sendResponse(res, data, 200, apiController);
                //res.send({
                //    message: "Testimonial was deleted successfully!"
                //});
            }
        })
        .catch(err => {
            sendResponse(res, [], 500, apiController, err);
        });
};

exports.deleteAll = (req, res) => {
    //Testimonial.deleteMany({})
    //    .then(data => {
    //        const filePath = path.join(__dirname, '../uploads/testimonial/');
    //        console.log(filePath);
    //        deleteAllFile(filePath);
    //        sendResponse(res, data, 200, apiController);  
    //    })
    //    .catch(err => {
    //        sendResponse(res, [], 500, apiController, err);  
    //    });
};

exports.getImage = (req, res) => {
    let ImgUrl = req.protocol + '://' + req.get('host');
    const id = req.params.id;

    Office.findById(id)
        .then(data => {

            if (!data) {
                return sendResponse(res, [], 404, apiController, null, req.method);
                //res.status(404).send({ message: "Not found Testimonial with id " + id });
            }
            else {
                data.ImageURL = (data.ImageUniqueName == null) ? null : ImgUrl + `/uploads/officeImages/${data.ImageUniqueName}`;
                sendResponse(res, data.ImageURL, 200, apiController, null, req.method);
                //res.send(data);
            }
        })
        .catch(err => {
            return sendResponse(res, [], 500, apiController, err.message, req.method);

        });
}

