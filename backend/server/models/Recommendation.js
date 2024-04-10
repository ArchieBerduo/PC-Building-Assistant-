const mongoose = require('mongoose');

// Define the schema
const recommendationSchema = new mongoose.Schema({
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
    Increase: { // It's good practice to follow JavaScript naming conventions, consider renaming to "increase"
        type: Number,
        required: true
    },
    
    // Added username field
    username: {
        type: String,
        required: true
    },
    // Added email field
    email: {
        type: String,
        required: true
    }
    
}, { 
    collection: "Recommendations" // Specify the collection name if different from the default
});

// Export the model
module.exports = mongoose.model('Recommendation', recommendationSchema);
