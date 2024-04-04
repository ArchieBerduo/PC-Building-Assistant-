const express = require('express');
const router = express.Router();

router.use(express.json());

router.post('/receive-recommendation', (req, res) => {
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

    res.status(200).send('Recommendation received and logged successfully');
});

module.exports = router;
