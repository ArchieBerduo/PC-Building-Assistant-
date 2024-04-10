const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation'); // Import the Recommendation model

router.post('/receive-recommendation', async (req, res) => {
    const { model, componentType, recommendation, username, email } = req.body;

    if (!model || !componentType || !recommendation || !username || !email) {
        console.log('Error: Missing required fields in recommendation format');
        return res.status(400).send({ error: 'Missing required fields in recommendation format' });
    }

    console.log(`Processing recommendation for Username: ${username}, Email: ${email}`);

    try {
        recommendation.forEach(async (rec) => {
            console.log(`Checking recommendation for Model: ${rec.Details.Model}, Username: ${username}, Email: ${email}`);

            // Check if a recommendation with the same attributes already exists
            const existingRecommendation = await Recommendation.findOne({
                model,
                componentType: componentType,
                new_model: rec.Details.Model,
                benchmark: rec.Details.Benchmark,
                Increase: rec.Increase,
                username, // Use username from the payload
                email // Use email from the payload
            });

            if (!existingRecommendation) {
                console.log(`Creating new recommendation for Username: ${username}, Email: ${email}`);
                // If it does not exist, create and save the new recommendation document
                await Recommendation.create({
                    model,
                    componentType: componentType,
                    new_model: rec.Details.Model,
                    benchmark: rec.Details.Benchmark,
                    Increase: rec.Increase,
                    username, // Include username in the document
                    email // Include email in the document
                });
            } else {
                // Log about the duplicate recommendation
                console.log(`Duplicate recommendation detected for Username: ${username}, Email: ${email}. Skipping...`);
            }
        });

        res.status(200).send('Recommendation processed successfully');
    } catch (error) {
        console.error(`Error processing recommendation for Username: ${username}, Email: ${email}:`, error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
