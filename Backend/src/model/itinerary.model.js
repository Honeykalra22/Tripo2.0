import mongoose from "mongoose";

const itineraryScheme = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    activities: [
        {
            type: String,
            required: true,
        },
    ],
    budget: {
        type: Number,
        required: true,
        default: 1000,
    },    
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value >= this.startDate
            },
            message: 'end date is must be greater than start date'
        }
    },
    description: {
        type: String,
    }
}, { timestamps: true })

export const Itinerary = mongoose.model('Itinerary', itineraryScheme)
