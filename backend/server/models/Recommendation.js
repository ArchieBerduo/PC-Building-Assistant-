const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    model: {
        type: String,
        required: true
    },
    componentType: {
        type: String,
        required: true
    },
    recommendations: [{
        model: {
            type: String,
            required: true
        },
        benchmark: {
            type: Number,
            required: true
        },
        increase: { // It's generally a good practice to start property names with a lowercase letter
            type: Number,
            required: true
        }
    }]
}, { timestamps: true });

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;
