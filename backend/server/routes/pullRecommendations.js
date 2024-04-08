const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation'); // Adjust the path according to your structure

// Define the GET endpoint directly with all logic inside
router.get('/', async (req, res) => {
    const { componentType, model } = req.query; // Assuming these are passed as query parameters

    try {
        // Query directly using componentType and model, adjusting to the new structure
        const recommendations = await Recommendation.find({
            componentType: componentType,
            model: model // Query based on the current model
        })
        // Assuming Increase is still a relevant sorting criterion
        .sort({'Increase': -1}) // Adjust sorting based on the new document structure
        .limit(3); // Limit to the top 3 recommendations

        // Respond with the fetched recommendations
        res.json(recommendations);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
