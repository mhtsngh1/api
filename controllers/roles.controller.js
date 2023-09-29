const db = require("../models");
const Role = db.roles;
exports.create = (req, res) => {
    // Validate request
    if (!req.body.RoleName || !req.body.RoleId) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial
    const role = new Role({
        RoleId: req.body.RoleId,
        RoleName: req.body.RoleName        
    });

    // Save Tutorial in the database
    role
        .save(role)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

exports.findAll = (req, res) => {
    //const title = req.query.title;
    //var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    //Tutorial.find(condition)
    Role.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving roles."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Role.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Role with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Role with id=" + id });
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

    Role.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Role with id=${id}. Maybe Role was not found!`
                });
            } else {
                res.send({
                    message: "Role was deleted successfully!"
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

