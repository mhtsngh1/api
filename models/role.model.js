module.exports = mongoose => {
    const Roles = mongoose.model(
        "Roles",
        mongoose.Schema(
            {
                RoleId: Number,
                RoleName: String               
            },
            { timestamps: true }
        )
    );

    return Roles;
};