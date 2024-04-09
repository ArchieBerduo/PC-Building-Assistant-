const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation'); // Import the Recommendation model
//saves recommendation to the DB from the cloud
router.use(express.json());

router.post('/receive-recommendation', async (req, res) => {
    const { model, component_type, recommendation } = req.body;

    // Assuming the middleware adds a user object to req
    // Check if user is authenticated and user details are available
    if (!req.user || !req.user.UserId || !req.user.email) {
        return res.status(401).send({ error: 'Unauthorized: User details not found.' });
    }

    // Extract UserId and email from authenticated user's details
    const { UserId, email } = req.user;

    // Validate other request body contents
    if (!model || !component_type || !recommendation) {
        return res.status(400).send({ error: 'Invalid recommendation format, missing required information.' });
    }

    try {
        console.log(`Received recommendation for Model: ${model}, Component Type: ${component_type}`);

        recommendation.forEach((rec, index) => {
            console.log(`Recommendation #${index + 1} for ${rec.Increase} increase:`);
            console.log(`- Model: ${rec.Details.Model}`);
            console.log(`- Benchmark: ${rec.Details.Benchmark}`);
        });

        for (const rec of recommendation) {
            const existingRecommendation = await Recommendation.findOne({
                UserId,
                email,
                model,
                componentType: component_type,
                new_model: rec.Details.Model,
                benchmark: rec.Details.Benchmark,
                Increase: rec.Increase
            });

            if (!existingRecommendation) {
                await Recommendation.create({
                    UserId,
                    email,
                    model,
                    componentType: component_type,
                    new_model: rec.Details.Model,
                    benchmark: rec.Details.Benchmark,
                    Increase: rec.Increase
                });
            } else {
                console.log('Duplicate recommendation detected, skipping...');
            }
        }

        res.status(200).send('Recommendation processed successfully');
    } catch (error) {
        console.error('Error saving recommendation:', error);
        res.status(500).send('Internal server error');
    }
});




module.exports = router;
