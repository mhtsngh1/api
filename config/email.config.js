
const nodemailer = require('nodemailer'); 
 
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'mohit.singh1@mobileprogramming.com',
        pass: 'M@h!t1093'
    }
});
 
let mailDetails = {
    from: 'mohit.singh1@mobileprogramming.com',
    to: 'mohit.singh1093@gmail.com',
    subject: 'Test mail',
    text: 'Node.js testing mail for GeeksforGeeks'
};
 
function sendMail(){
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
});
}
module.exports = { sendMail };