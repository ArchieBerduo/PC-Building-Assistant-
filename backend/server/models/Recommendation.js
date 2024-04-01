const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    model: String,
    component_type: String,
    recommendation: [
        {
            Model: String,
            Benchmark: String,
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('Recommendation', recommendationSchema);
