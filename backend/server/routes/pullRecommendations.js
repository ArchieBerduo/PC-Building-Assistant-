const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation');

router.get('/', async (req, res) => {
    // Log the incoming request URL and query parameters
    console.log('Incoming request for recommendations with query:', req.query);

    const { componentType, model, username, email } = req.query;

    // Ensure username and email are provided for the query
    if (!username || !email) {
        console.log('Error: Missing username or email in the query');
        return res.status(400).send({ error: 'Missing username or email in the query' });
    }

    try {
        // Array to hold promises for each Increase value query
        const increaseValues = [15, 30, 45];
        const queries = increaseValues.map(increase => 
            Recommendation.findOne({
                componentType: componentType,
                model: model,
                Increase: increase,
                username: username, // Include username in the query
                email: email, // Include email in the query
            })
        );

        // Execute all queries in parallel
        const recommendations = await Promise.all(queries);

        // Filter out any null results (in case a specific Increase value isn't found)
        const validRecommendations = recommendations.filter(rec => rec !== null);

        // Log the valid recommendations to the console
        console.log('Fetched Recommendations:', validRecommendations);

        // Respond with the fetched recommendations
        res.json(validRecommendations);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;