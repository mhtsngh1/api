const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
module.exports = mongoose => {
    const User = mongoose.model(
        "Users",
        mongoose.Schema(
            {
                FirstName: {
                    type: String,
                    required: [true, 'First Name is required. Please provide a First Name.']
                },
                LastName: {
                    type: String,
                    required: true
                },
                //Email: {
                //    type: String,
                //    required: true,
                //    unique: true,
                //},
                Email: {
                    type: String,
                    required: [true, 'Email is required. Please provide an Email.'],
                    unique: true,
                    validate: [
                        {
                            validator: async function (value) {
                                // Use a custom async validator to check uniqueness
                                const existingUser = await this.constructor.findOne({ Email: value });
                                return !existingUser;
                            },
                            message: 'Email address is already in use. Please choose a different email.',
                        },
                        {
                            validator: function (value) {
                                // Use a regular expression to check the email format
                                return emailRegex.test(value);
                            },
                            message: 'Invalid email format. Please provide a valid email address.',
                        },
                    ],
                
                },
                MobileNo: {
                    type: String,
                    required: true,
                    unique: true,
                    minlength: [10, 'Minimum length of mobile no is 10 digit '], // Minimum length for a typical phone number
                    maxlength: 15, // Maximum length for a phone number
                },
                Password: {
                    type: String,
                    required: true,                   
                },
                IsActive: {
                    type: Boolean,
                    default: false,
                },
                Roles: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Roles"
                    }
                ]
            },
            { timestamps: true }
        )
    );

    return User;
};