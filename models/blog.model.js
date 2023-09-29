const { COMMON_VALIDATION_MESSAGES_Blog } = require('./../commonHelper/common.messages');

module.exports = mongoose => {
    const Blog = mongoose.model(
        "Blog",
        mongoose.Schema(
            {
                AutherName: {
                    type: String,
                    required: [true, COMMON_VALIDATION_MESSAGES_Blog.AutherName]
                },
                Blog: [
                    {
                        Title: {
                            type: String,
                            
                        },
                        Description: {
                            type: String,
                            
                        }
                    }
                ],
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

    return Blog;
};