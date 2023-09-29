

function sendResponse(res, data, statusCode, controllerName, errorMessage, reqType) { 
    const response = {
        status: statusCode,
        message: retunMessage(statusCode, controllerName, reqType, errorMessage, res),
        records: Array.isArray(data) ? data.length : 1,       
        data: data        
    };
     res.status(statusCode).json(response);
}

function retunMessage(statusCode, controllerName, reqType, errorMessage, res) {  
   
    if (reqType == 'POST') {       
        if (statusCode == 201) return `${controllerName} created successfully!`;
        if (statusCode == 400) return `${errorMessage}`;
        if (statusCode == 401) return ``;
        if (statusCode == 500) return `${errorMessage}`;
    }
    if (reqType == 'GET') {
        if (statusCode == 200) return `Ok`;
        if (statusCode == 201) return `${controllerName} created successfully!`;
        if (statusCode == 400) return `${errorMessage}`;
        if (statusCode == 401) return ``;
        if (statusCode == 404) return `No record found!!`;
        if (statusCode == 500) return `${errorMessage}`;
    }
    if (reqType == 'PUT') {
        if (statusCode == 200) return `${controllerName} updated successfully.`;      
        if (statusCode == 400) return `${errorMessage}`;
        if (statusCode == 401) return ``;
        if (statusCode == 404) return `Cannot delete ${controllerName} with id=${res.req.params.id}. Maybe Record was not found!`;
        if (statusCode == 500) return `${errorMessage}`;
    }
    if (reqType == 'DELETE') {
        if (statusCode == 200) return `${controllerName} was deleted successfully!`;  
        if (statusCode == 401) return ``;
        if (statusCode == 404) return `Cannot delete ${controllerName} with id=${res.req.params.id}. Maybe Record was not found!`;
        if (statusCode == 500) return `${errorMessage}`;
    }
}

//function retunMessageForErrorCatch(statusCode, errorMessage) {
    
//    if (statusCode == 400) return `${errorMessage}`;
//    if (statusCode == 401) return `${errorMessage}`;
//    if (statusCode == 404) return `${errorMessage}`;
//    if (statusCode == 500) return `${errorMessage}`;
//}

function otherApiResponse(res, statusCode, controllerName, errorMessage) {
    const response = {
        status: statusCode,
        message: errorMessage       
    };
    res.status(statusCode).json(response);
}


module.exports = { sendResponse, otherApiResponse };