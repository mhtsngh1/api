const db = require("../models");
const mongoose = require('mongoose');
const { sendResponse } = require('../commonHelper/response.model');
const User = db.user;
const apiController = 'user';
const bcrypt = require("bcryptjs");
exports.create = (req, res) => {    
    // Create a User
    const user = new User({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        MobileNo: req.body.MobileNo,
        Password: bcrypt.hashSync(req.body.Password, 8),
        Roles: req.body.Roles,
    });

    // Save Tutorial in the database
    user
        .save(user)
        .then(data => {
            sendResponse(res, data, 201, apiController);
        })
        .catch(err => {
            sendResponse(res, [], 500, apiController, err);  
        });
};

exports.findAll = (req, res) => {

    User.find()
        .then(data => {
            if (!Array.isArray(data)) {
                return sendResponse(res, data, 500, apiController);
            }

            if (data.length === 0) {
                return sendResponse(res, data, 404, apiController);
            }
            sendResponse(res, data, 200, apiController);  
        })
        .catch(err => {
            sendResponse(res, [], 500, apiController, err);
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then(data => {
            if (!data)
                return sendResponse(res, [], 404, apiController);
            else sendResponse(res, data, 200, apiController);
        })
        .catch(err => {
            sendResponse(res, [], 500, apiController, err);
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Role.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Role with id=${id}. Maybe Role was not found!`
                });
            } else res.send({ message: "Role was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Role with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            } else {
                res.send({
                    message: "User was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Role with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Role.deleteMany({})
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