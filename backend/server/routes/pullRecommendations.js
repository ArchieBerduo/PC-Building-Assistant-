const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation');

router.get('/', async (req, res) => {
    const { componentType, model } = req.query;

    try {
        // Array to hold promises for each Increase value query
        const increaseValues = [15, 30, 45];
        const queries = increaseValues.map(increase => 
            Recommendation.findOne({
                componentType: componentType,
                model: model,
                Increase: increase
            })
        );

        // Execute all queries in parallel
        const recommendations = await Promise.all(queries);

        // Filter out any null results (in case a specific Increase value isn't found)
        const validRecommendations = recommendations.filter(rec => rec !== null);

        // Respond with the fetched recommendations
        res.json(validRecommendations);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;