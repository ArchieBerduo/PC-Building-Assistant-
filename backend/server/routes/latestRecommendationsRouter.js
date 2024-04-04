const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation');

router.get('/latest-recommendations', async (req, res) => {
    try {
        const latestRecommendations = await Recommendation.find().sort({ createdAt: -1 }).limit(3);
        res.json(latestRecommendations);
    } catch (error) {
        console.error('Error fetching latest recommendations:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;