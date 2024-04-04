const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation'); // Path to your Mongoose model

router.use(express.json());

router.post('/receive-recommendation', async (req, res) => {
    let { model, component_type, recommendation } = req.body;

    if (!model || !component_type || !recommendation) {
        return res.status(400).send({ error: 'Invalid recommendation format' });
    }

    // Transform the recommendation items to match the schema
    recommendation = recommendation.map(rec => ({
        Model: rec.model,
        Benchmark: rec.benchmark,
        Increase: rec.increase
    }));

    try {
        const newRecommendation = new Recommendation({
            model,
            component_type,
            recommendation
        });

        await newRecommendation.save();
        
        res.status(200).send('Recommendation processed successfully');
    } catch (error) {
        console.error("Error saving recommendation:", error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;

