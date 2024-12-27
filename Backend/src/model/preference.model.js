import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    preferedLocation: [
        {
            type: String,
            required: true,
        }
    ],
    interest: {
        type: String,
        default: 'General',
    },
    budget: {
        type: Number,
        required: true,
        default: 1000,
    },
    comments: {
        type: String,
    }
}, { timestamps: true })

export const Preference = mongoose.model('Preference', preferenceSchema)