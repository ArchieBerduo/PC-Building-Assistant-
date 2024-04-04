const express = require('express');
const router = express.Router();

router.use(express.json());

// Initialize an in-memory store
let recommendationsStore = {};

router.post('/receive-recommendation', (req, res) => {
    const { model, component_type, recommendation } = req.body;

    // Validation to ensure the received data has the expected structure
    if (!model || !component_type || !recommendation) {
        return res.status(400).send({ error: 'Invalid recommendation format' });
    }

    // Log the received recommendation
    console.log(`Received recommendation for Model: ${model}, Component Type: ${component_type}`);

    recommendation.forEach((rec, index) => {
        console.log(`Recommendation #${index + 1} for ${rec.Increase} increase:`);
        console.log(`- Model: ${rec.Details.Model}`);
        console.log(`- Benchmark: ${rec.Details.Benchmark}`);
    });

    // Replace or set the new recommendation in the in-memory store
    // Using a composite key of model and component_type to uniquely identify a recommendation
    const key = `${model}_${component_type}`;
    recommendationsStore[key] = recommendation;

    res.status(200).send('Recommendation processed successfully');
});

module.exports = router;
