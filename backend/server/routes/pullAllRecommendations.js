const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation');

router.get('/', async (req, res) => {
    // Log the incoming request URL and query parameters
    console.log('Incoming request for recommendations with query:', req.query);

    const { username, email } = req.query;

    // Ensure username and email are provided for the query
    if (!username || !email) {
        console.log('Error: Missing username or email in the query');
        return res.status(400).send({ error: 'Missing username or email in the query' });
    }

    try {
        // Fetch all recommendations that match the username and email
        const recommendations = await Recommendation.find({
            username: username,
            email: email
        });

        // Log the fetched recommendations to the console
        console.log('Fetched Recommendations:', recommendations);

        // Respond with the fetched recommendations
        res.json(recommendations);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
