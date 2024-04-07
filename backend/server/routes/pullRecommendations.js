// latestRecommendationsRouter.js
const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation');

router.get('/pullRecommendations', async (req, res) => {
    const { componentType, model } = req.query;

    // Validate componentType
    if (!componentTypeToModel[componentType]) {
        return res.status(400).json({ error: "Invalid component type provided." });
    }

    try {
        // Select the correct model based on componentType
        const Model = componentTypeToModel[componentType];

        // Construct query based on model presence
        const query = model ? { model } : {};

        // Fetch recommendations
        const recommendations = await Model.find(query, 'model recommendations');

        // Return the recommendations
        return res.json(recommendations);
    } catch (error) {
        console.error(`Error fetching ${componentType} recommendations:`, error);
        return res.status(500).json({ error: `Error fetching ${componentType} recommendations.` });
    }
});

module.exports = router;

