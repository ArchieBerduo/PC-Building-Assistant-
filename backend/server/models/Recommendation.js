const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
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
        increase: {
            type: Number,
            required: true
        }
    }]
}, { timestamps: true });

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;