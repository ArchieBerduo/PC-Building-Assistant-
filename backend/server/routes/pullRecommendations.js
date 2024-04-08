const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation'); // Adjust the path according to your structure

// Define the GET endpoint directly with all logic inside
router.get('/', async (req, res) => {
    const { componentType, model } = req.query; // Assuming these are passed as query parameters

    try {
        // Directly perform the query within the route handler
        const recommendations = await Recommendation.find({
            componentType: componentType,
            model: model // Include both componentType and model in the query
        })
        .sort({'recommendations.Increase': -1}) // Sort by Increase in descending order
        .limit(3); // Limit to the top 3 recommendations

        // Respond with the fetched recommendations
        res.json(recommendations);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
