//const multer = require('multer');
//const path = require('path');

//const storage = multer.diskStorage({

//    destination: './uploads/testimonial/', // Specify the folder where images will be stored
//    filename: (req, file, cb) => {
//        const extname = path.extname(file.originalname);
//        cb(null, 'testimonial-' + Date.now() + extname);
//    },
//});

//const upload = multer({ storage: storage });

//module.exports = upload;
// multerConfig.js

const multer = require('multer');
const path = require('path');

// Function to create a Multer upload instance with a custom destination
function createMulter(destination, apiController, isRequired, filetype) {
    console.log(destination, apiController, isRequired, filetype);
    const storage = multer.diskStorage({
        destination: destination,
        filename: (req, file, cb) => {      
            const extname = path.extname(file.originalname);
            cb(null, `${apiController}-` + Date.now() + extname);
        },
    });
    return multer({ storage: storage });    
}



module.exports = { createMulter };
