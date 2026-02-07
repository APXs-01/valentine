const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    screenResponses: [{
        screenNumber: {
            type: Number,
            required: true
        },
        response: {
            type: String,
            enum: ['Yes', 'No'],
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    finalResponse: {
        type: String,
        enum: ['Yes', 'No', 'Celebrating'],
        default: null
    },
    completedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Response', responseSchema);