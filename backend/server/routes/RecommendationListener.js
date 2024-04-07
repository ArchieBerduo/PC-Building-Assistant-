const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation'); // Import the updated Recommendation model

router.use(express.json());

router.post('/receive-recommendation', async (req, res) => {
    // Include username and email in the destructured request body
    const { username, email, model, component_type, recommendation } = req.body;

    // Extend validation to include username and email
    if (!username || !email || !model || !component_type || !recommendation) {
        return res.status(400).send({ error: 'Invalid recommendation format' });
    }

    try {
        console.log(`Received recommendation for User: ${username} (${email})`);
        console.log(`Model: ${model}, Component Type: ${component_type}`);

        // Logging each recommendation detail as before
        recommendation.forEach((rec, index) => {
            console.log(`Recommendation #${index + 1} for ${rec.Increase} increase:`);
            console.log(`- Model: ${rec.Details.Model}`);
            console.log(`- Benchmark: ${rec.Details.Benchmark}`);
        });

        // Adjusted to include username and email in the document creation
        for (const rec of recommendation) {
            await Recommendation.create({
                username, // Include username
                email, // Include email
                model,
                componentType: component_type,
                recommendations: [{
                    model: rec.Details.Model,
                    benchmark: rec.Details.Benchmark,
                    Increase: rec.Increase
                }]
            });
        }

        console.log("Recommendation saved successfully!");
        res.status(200).send('Recommendation processed successfully');
    } catch (error) {
        console.error('Error saving recommendation:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
