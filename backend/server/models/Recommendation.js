const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    component_type: {
        type: String,
        required: true
    },
    recommendation: [{
        Model: {
            type: String,
            required: true
        },
        Benchmark: {
            type: Number,
            required: true
        },
        Increase: {
            type: Number,
            required: true
        }
    }],
}, { timestamps: true });

module.exports = mongoose.model('Recommendation', recommendationSchema);