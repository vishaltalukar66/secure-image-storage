import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter email"],
        },
        password: {
            type: String,
            required: [true, "Please enter password"],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        forgotPasswordToken: String,
        // forgotPasswordExpiry: Date,
        verifyToken: String,
        // verifyTokenExpiry: Date,
    },
    {
        timestamps: true, // This will add createdAt and updatedAt fields
    });

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
