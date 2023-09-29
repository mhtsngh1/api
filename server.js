const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(cors())
app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});  
//var corsOptions = {
//    origin: "*",
//    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
//};

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

//---For upload file get apis 
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

require("./routes/tutorial.routes")(app);
require("./routes/role.routes")(app);
require("./routes/testimonial.routes")(app);
require("./routes/user.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/contactus.routes")(app);
require("./routes/blog.routes")(app);
require("./routes/offices.routes")(app);