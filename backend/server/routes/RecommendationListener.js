// Import necessary libraries
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
// Assume processRecommendation is a function you'll use to process the recommendation
const { processRecommendation } = require('../utilities/RecommendationProcessor'); // Adjust the path as necessary

// Middleware to parse JSON bodies
router.use(bodyParser.json());

// Define the endpoint for receiving recommendations
router.post('/receive-recommendation', (req, res) => {
    const recommendation = req.body;
    
    // Check if the recommendation object is valid
    if (recommendation && recommendation.model && recommendation.component_type && recommendation.recommendation) {
        // Process the recommendation
        processRecommendation(recommendation);

        // Respond to acknowledge receipt and processing of the recommendation
        res.status(200).send({message: "Recommendation received and processed."});
    } else {
        // Handle invalid recommendation format
        res.status(400).send({error: "Invalid recommendation format."});
    }
});

module.exports = router;