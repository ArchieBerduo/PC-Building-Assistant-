const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation'); // Correct path to your model

router.use(express.json());

router.post('/receive-recommendation', async (req, res) => {
    const { model, component_type, recommendation } = req.body;

    // Ensure the received data has the expected structure
    if (!model || !component_type || !recommendation || !Array.isArray(recommendation)) {
        return res.status(400).send({ error: 'Invalid recommendation format' });
    }

    // Log the received data for debugging
    console.log("Received data:", req.body);

    // Directly logging the received recommendations for debug purpose
    recommendation.forEach((rec, index) => {
        console.log(`Recommendation #${index + 1} for ${rec.increase}% increase:`);
        console.log(`- Model: ${rec.model}`);
        console.log(`- Benchmark: ${rec.benchmark}`);
    });

    try {
        // Create and save the new recommendation document as is
        const newRecommendation = new Recommendation({
            model,
            component_type,
            recommendation // Assuming this already matches the expected array structure
        });

        await newRecommendation.save();
        
        res.status(200).send('Recommendation processed successfully');
    } catch (error) {
        console.error("Error saving recommendation:", error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;