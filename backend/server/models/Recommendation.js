const mongoose = require('mongoose');

// Define the schema
const recommendationSchema = new mongoose.Schema({
    UserId: {
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
    new_model: {
        type: String,
        required: true
    },
    benchmark: {
        type: Number,
        required: true
    },
    Increase: {
        type: Number,
        required: true
    }
}, { 
    collection: "Recommendations" // Specify the collection name if different from the default
});

// Export the model
module.exports = mongoose.model('Recommendation', recommendationSchema);
