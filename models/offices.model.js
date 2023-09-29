const { COMMON_VALIDATION_MESSAGES_Offices, emailRegex } = require('./../commonHelper/common.messages');

module.exports = mongoose => {
    const Offices = mongoose.model(
        "offices",
        mongoose.Schema(
            {
                OfficeName: {
                    type: String,
                    required: [true, COMMON_VALIDATION_MESSAGES_Offices.ReqOfficeName]
                },
                Address: {
                    type: Object,
                    Address: { },
                    required: [true, COMMON_VALIDATION_MESSAGES_Offices.Address]
                }
                    
                ,
                Email: {
                    type: String,
                    required: [true, COMMON_VALIDATION_MESSAGES_Offices.ReqEmail],
                    validate: [
                        {
                            validator: function (value) {
                                // Use a regular expression to check the email format
                                return emailRegex.test(value);
                            },
                            message: COMMON_VALIDATION_MESSAGES_Offices.CheckEmailFormat,
                        },
                    ],

                },
                PhoneNumber: {
                    type: String,
                    required: [true, COMMON_VALIDATION_MESSAGES_Offices.ReqPhoneNo]
                },
                ImageName: {
                    type: String
                },
                IsActive: {
                    type: Boolean,
                    default: false
                },
                ImageUniqueName: {
                    type: String,
                    //required: [true, COMMON_VALIDATION_MESSAGES_Blog.Image]
                }

            },
            { timestamps: true }
        )
    );

    return Offices;
};