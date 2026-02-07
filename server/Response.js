const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    screenResponse: [{
        screenNumber: { type: Number,
        required: true },
        response: { 
            type: String,
            enum: ['Yes','No'],
            required: true
        },
        timestamp: { 
            type: Date, default: 
            Date.now 
        }
    }],
    finalResponse: {
        type: String,
        enum: ['Yes','No','Celebrating'],
        default: null
    },
    comletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Response', responseSchema);
