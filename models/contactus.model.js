const { COMMON_VALIDATION_MESSAGES_Contactus, emailRegex }=require('./../commonHelper/common.messages');

module.exports = mongoose => {
    const ContactUs = mongoose.model(
        "ContactUs",
        mongoose.Schema(
            {
                FullName: {
                    type: String,
                    required: [true, COMMON_VALIDATION_MESSAGES_Contactus.ReqFullName]
                },             
               
                Email: {
                    type: String,
                    required: [true, COMMON_VALIDATION_MESSAGES_Contactus.ReqEmail],                  
                    validate: [                       
                        {
                            validator: function (value) {
                                // Use a regular expression to check the email format
                                return emailRegex.test(value);
                            },
                            message: COMMON_VALIDATION_MESSAGES_Contactus.CheckEmailFormat,
                        },
                    ],

                },
                MobileNo: {
                    type: String,
                    required: [true, COMMON_VALIDATION_MESSAGES_Contactus.ReqMobileNo]                   
                },
                Message: {
                    type: String,
                    required: [true, COMMON_VALIDATION_MESSAGES_Contactus.ReqMessage],
                    trim: true,
                },
                IsNotRobot: {
                    type: Boolean
                   
                }
            },
            { timestamps: true }
        )
    );

    return ContactUs;
};