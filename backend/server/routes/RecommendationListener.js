const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation'); // Import the Recommendation model
//saves recommendation to the DB from the cloud
router.use(express.json());

router.post('/receive-recommendation', async (req, res) => {
    const { model, component_type, recommendation } = req.body;
    let UserId = null;
    let email = null;

    // If user details are available (i.e., through some authentication middleware), use them
    if (req.user && req.user.UserId && req.user.email) {
        UserId = req.user.UserId;
        email = req.user.email;
    }

    if (!model || !component_type || !recommendation) {
        return res.status(400).send({ error: 'Invalid recommendation format, missing required information.' });
    }

    try {
        // Process each recommendation
        for (const rec of recommendation) {
            // Check for an existing recommendation
            const query = { model, componentType: component_type, new_model: rec.Details.Model, benchmark: rec.Details.Benchmark, Increase: rec.Increase };
            if (UserId && email) { // Add user details to the query if available
                Object.assign(query, { UserId, email });
            }

            const existingRecommendation = await Recommendation.findOne(query);

            if (!existingRecommendation) {
                const newRec = Object.assign({ model, componentType: component_type, new_model: rec.Details.Model, benchmark: rec.Details.Benchmark, Increase: rec.Increase }, UserId && email ? { UserId, email } : {});
                await Recommendation.create(newRec);
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
