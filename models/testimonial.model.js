module.exports = mongoose => {
    const Testimonial = mongoose.model(
        "Testimonial",
        mongoose.Schema(
            {
                Name: { type: String, required: true },
                ImageName: String,
                Title: { type: String, required: true },
                Description: { type: String, required: true },
                IsActive: { type: Boolean, default: false }, // Set a default value if needed               
                ImageUniqueName: String
                
            },
            { timestamps: true }
        )
    );

    return Testimonial;
};