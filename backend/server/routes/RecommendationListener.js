const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation'); // Import the Recommendation model

router.use(express.json());

router.post('/receive-recommendation', async (req, res) => {
    const { model, component_type, recommendation } = req.body;

    if (!model || !component_type || !recommendation) {
        return res.status(400).send({ error: 'Invalid recommendation format' });
    }

    try {
        console.log(`Received recommendation for Model: ${model}, Component Type: ${component_type}`);

        recommendation.forEach((rec, index) => {
            console.log(`Recommendation #${index + 1} for ${rec.Increase} increase:`);
            console.log(`- Model: ${rec.Details.Model}`);
            console.log(`- Benchmark: ${rec.Details.Benchmark}`);
        });

        for (const rec of recommendation) {
            // Check if a recommendation with the same attributes already exists
            const existingRecommendation = await Recommendation.findOne({
                model,
                componentType: component_type,
                new_model: rec.Details.Model,
                benchmark: rec.Details.Benchmark,
                Increase: rec.Increase
            });

            if (!existingRecommendation) {
                // If it does not exist, create and save the new recommendation document
                await Recommendation.create({
                    model,
                    componentType: component_type,
                    new_model: rec.Details.Model,
                    benchmark: rec.Details.Benchmark,
                    Increase: rec.Increase
                });
            } else {
                // Optional: Update the existing document or take some other action
                console.log('Duplicate recommendation detected, skipping...');
                // Example: Update existing document
                // await existingRecommendation.updateOne({ /* new data */ });
            }
        }

        res.status(200).send('Recommendation processed successfully');
    } catch (error) {
        console.error('Error saving recommendation:', error);
        res.status(500).send('Internal server error');
    }
});



module.exports = router;
