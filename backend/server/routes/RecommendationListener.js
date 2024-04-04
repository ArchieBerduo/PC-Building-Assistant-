const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation'); // Import the Recommendation model

router.use(express.json());

router.post('/receive-recommendation', async (req, res) => {
    const { model, component_type, recommendation } = req.body;

    // Validation to ensure the received data has the expected structure
    if (!model || !component_type || !recommendation) {
        return res.status(400).send({ error: 'Invalid recommendation format' });
    }

    try {
        // Log the received recommendation
        console.log(`Received recommendation for Model: ${model}, Component Type: ${component_type}`);

        recommendation.forEach((rec, index) => {
            console.log(`Recommendation #${index + 1} for ${rec.Increase} increase:`);
            console.log(`- Model: ${rec.Details.Model}`);
            console.log(`- Benchmark: ${rec.Details.Benchmark}`);
});


        // Create and save new recommendation documents in the database
        await Recommendation.create({
            model,
            componentType: component_type,
            recommendations: recommendation
        });

        // Send success response
        res.status(200).send('Recommendation processed successfully');
    } catch (error) {
        // Handle errors
        console.error('Error saving recommendation:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
