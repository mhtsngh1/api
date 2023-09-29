const commonMessages = {
    unauthorized: 'Unauthorized: Missing token',
    invalidToken: 'Unauthorized: Invalid token',
    userNotFound: 'User not found',
    internalServerError: 'Internal server error',
    invalidPassword: 'Invalid Password!!',   
};
const COMMON_VALIDATION_MESSAGES_Contactus = {
    ReqFullName: 'Enter your Full Name.',
    ReqEmail: 'Email is required. Please provide an Email.',
    CheckEmailFormat: 'Invalid email format. Please provide a valid email address.',
    ReqMobileNo: 'Mobile No id  Required.',
    ReqMessage: 'Message field can not be empty! Please enter your Message.',
};
const COMMON_VALIDATION_MESSAGES_Blog= {
    AutherName: 'Enter Auther Name.',
    Image:'Upload Blog Image'
};
const COMMON_VALIDATION_MESSAGES_Offices = {
    ReqOfficeName: 'Enter Office Name.',
    ReqEmail: 'Email is required. Please provide an Email.',
    CheckEmailFormat: 'Invalid email format. Please provide a valid email address.',
    ReqPhoneNo: 'Mobile/Phone-No is Required',
    ReqAddress: 'Address field is Required',
    ReqPhoneNo:'Phone-No is Required' ,
   
};


const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ContactUsFields = ['FullName', 'Email', 'MobileNo', 'Message', 'IsNotRobot'];
const BlogFields = ['AutherName'];
const OfficeFields = ['OfficeName', 'Address', 'Email','PhoneNumber'];

module.exports = {
    commonMessages,
    COMMON_VALIDATION_MESSAGES_Contactus,
    emailRegex,
    ContactUsFields,
    COMMON_VALIDATION_MESSAGES_Blog,
    BlogFields,
    COMMON_VALIDATION_MESSAGES_Offices,
    OfficeFields
};