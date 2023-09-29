const db = require("../models");
const ContactUs = db.contactus;
const { sendResponse } = require('../commonHelper/response.model');
const apiController = 'Contact Us';


exports.create = (req, res) =>  {  
    const contactus = new ContactUs({
        FullName: req.body.FullName,       
        Email: req.body.Email,
        MobileNo: req.body.MobileNo,
        Message: req.body.Message,
        IsNotRobot: req.body.IsNotRobot
    });   
    contactus
        .save(contactus)
        .then(data => {
            sendResponse(res, data, 201, apiController, null, req.method);
        })
        .catch(err => {           
            return  sendResponse(res, [], 500, apiController, err.message, req.method);
        });   
};

exports.findAll = (req, res) => {   
    ContactUs.find()
        .then(data => {
            if (!Array.isArray(data)) {
                return sendResponse(res, data, 404, apiController, null, req.method);
            }
            if (data.length === 0) {
                return sendResponse(res, data, 404, apiController, null, req.method);
            }
            sendResponse(res, data, 200, apiController, null, req.method);
        })
        .catch(err => {
            return sendResponse(res, [], 500, apiController, err.message, req.method);
        });
};

exports.findOne = (req, res) => {   
    const id = req.params.id;

    ContactUs.findById(id)
        .then(data => {
            if (!data)
                return sendResponse(res, [], 404, apiController, null, req.method);
            else sendResponse(res, data, 200, apiController, null, req.method);
        })
        .catch(err => {
            return sendResponse(res, [], 500, apiController, err.message, req.method);
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    ContactUs.findById(id)
        .then(data => {
            if (!data) {
                return sendResponse(res, [], 404, apiController, null, req.method);
            }
            data.FullName = req.body.FullName;
            data.Email = req.body.Email;
            data.MobileNo = req.body.MobileNo;
            data.Message = req.body.Message;
            data.IsNotRobot = req.body.IsNotRobot;
            data.save()
                .then(updatedContactus => {
                    sendResponse(res, updatedContactus, 200, apiController, null, req.method);
                })
                .catch(err => {
                    return sendResponse(res, [], 500, apiController, err.message, req.method);
                });
        })
        .catch(err => {
            sendResponse(res, [], 500, apiController);
        });
};

exports.delete = (req, res) => {   
    const id = req.params.id;

    ContactUs.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                return sendResponse(res, [], 404, apiController, null, req.method);
                
            } else {
                sendResponse(res, [], 200, apiController, null, req.method);
            }
        })
        .catch(err => {
            return sendResponse(res, [], 500, apiController, err.message, req.method);           
        });
};

exports.deleteAll = (req, res) => {    
    ContactUs.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Role were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all roles."
            });
        });
};

exports.getImage = (req, res) => {
    let ImgUrl = req.protocol + '://' + req.get('host');
    const id = req.params.id;

    Testimonial.findById(id)
        .then(data => {

            if (!data) {
                return sendResponse(res, [], 404, apiController);
                //res.status(404).send({ message: "Not found Testimonial with id " + id });
            }
            else {
                data.ImageURL = (data.ImageUniqueName == null) ? null : ImgUrl + `/uploads/testimonial/${data.ImageUniqueName}`;
                sendResponse(res, data.ImageURL, 200, apiController);
                //res.send(data);
            }
        })
        .catch(err => {
            sendResponse(res, [], 500, apiController, err);
            //res.status(500)
            //    .send({ message: "Error retrieving Testimonial with id=" + id });
        });
}



