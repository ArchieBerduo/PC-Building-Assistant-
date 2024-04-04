const express = require('express');
const router = express.Router();

router.use(express.json());

router.post('/receive-recommendation', (req, res) => {
    const { model, component_type, recommendation } = req.body;

    // Validation to ensure the received data has the expected structure
    if (!model || !component_type || !recommendation) {
        return res.status(400).send({ error: 'Invalid recommendation format' });
    }

    console.log(`Received recommendation for Model: ${model}, Component Type: ${component_type}`);

    recommendation.forEach((rec, index) => {
        console.log(`Recommendation #${index + 1} for ${rec.Increase} increase:`);
        console.log(`- Model: ${rec.Details.Model}`);
        console.log(`- Benchmark: ${rec.Details.Benchmark}`);
    });

    // Here you would process the recommendation, for example, save it to a database

    res.status(200).send('Recommendation processed successfully');
});

module.exports = router;
