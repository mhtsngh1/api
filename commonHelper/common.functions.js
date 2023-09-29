const {sendResponse } = require('../commonHelper/response.model');
function checkRequiredFields(requiredFields) {
    return (req, res, next) => {
        const missingFields = requiredFields.filter((field) => !(field in req.body));       
        if (missingFields.length > 0) {
            return sendResponse(res, [], 400, null, `Missing required fields: ${missingFields.join(', ')}`, req.method)
        }
        next();
    };
}

function checkRequiredFieldsWithImages(requiredFields) {    
    return (req, res, next) => {
       
        const missingFields = requiredFields.filter((field) => !(field in req.body));
        if (!req.file || !req.file.mimetype.startsWith("image/")) {
            missingFields.push("Image");
        }
        if (missingFields.length > 0) {
            return sendResponse(res, [], 400, null, `Missing required fields: ${missingFields.join(', ')}`, req.method)
        }
        next();
    };
}


module.exports = { checkRequiredFields, checkRequiredFieldsWithImages };