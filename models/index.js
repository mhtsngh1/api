const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;
db.tutorials = require("./tutorial.model.js")(mongoose);
db.roles = require("./role.model.js")(mongoose);
db.testimonial = require("./testimonial.model.js")(mongoose);
db.user = require("./user.model.js")(mongoose);
db.contactus = require("./contactus.model")(mongoose);
db.blog = require("./blog.model")(mongoose);
db.offices = require("./offices.model")(mongoose);

module.exports = db;