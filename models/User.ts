import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name for this user.'],
            maxlength: [60, 'Name cannot be more than 60 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please provide an email for this user.'],
            unique: true,
            lowercase: true,
            validate: {
                validator: function (v: string) {
                    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: 'Please enter a valid email',
            },
        },
        password: {
            type: String,
            required: [true, 'Please provide a password for this user.'],
            minlength: [6, 'Password cannot be less than 6 characters'],
        },
        role: {
            type: String,
            enum: ['user', 'admin', 'moderator'],
            default: 'user',
        },
        image: {
            type: String,
        },
        plan: {
            type: String,
            enum: ['basic', 'pro', 'premium'],
            default: 'basic',
        },
    },
    {
        timestamps: true,
    }
);

// Prevent overwrite in dev mode
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
