const config = require("../config/auth.config");
const db = require("../models");
const commonMessages = require("../commonHelper/common.messages.js");
const {otherApiResponse } = require("../commonHelper/response.model.js");
const User = db.user;
const Role = db.role;
const controllerName = 'Auth';
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signin = (req, res) => {    
    User.findOne({
        Email: req.body.Email
    })
       /* .populate("Roles", "-__v")*/
        .then(user => {
            if (!user) {
                return otherApiResponse(res, 404, controllerName, commonMessages.userNotFound);
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.Password,
                user.Password
            );

            if (!passwordIsValid) {
                return otherApiResponse(res, 401, controllerName, commonMessages.invalidPassword);
            }
            const token = jwt.sign({ email: user.Email },
                config.secret,
                {
                    algorithm: 'HS256',
                    allowInsecureKeySizes: true,
                    expiresIn: config.jwtExpiration,
                });

            //var authorities = [];

            //for (let i = 0; i < user.Roles.length; i++) {
            //    authorities.push("ROLE_" + user.Roles[i].name.toUpperCase());
            //}
            res.status(200).send({
                id: user._id,
                Email: user.Email,               
               // roles: authorities,
                accessToken: token
            });
        })
        .catch(err => {   
            otherApiResponse(res, 500, controllerName, commonMessages.internalServerError);
        
    });
};