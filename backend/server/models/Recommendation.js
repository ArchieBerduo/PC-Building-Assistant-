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
        model: { // Changed from Model to model
            type: String,
            required: true
        },
        benchmark: { // Changed from Benchmark to benchmark
            type: Number,
            required: true
        },
        increase: { // Changed from Increase to increase
            type: Number,
            required: true
        }
    }],
}, { timestamps: true });

module.exports = mongoose.model('Recommendation', recommendationSchema);