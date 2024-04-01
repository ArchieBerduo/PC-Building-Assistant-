const express = require('express');
const bodyParser = require('body-parser');
const { processRecommendation } = require('./RecommendationListener'); // Adjust the path as necessary

const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Define the endpoint that will receive push messages from Pub/Sub
app.post('/pubsub-push', (req, res) => {
    const message = req.body.message;
    const attributes = message.attributes; // Assuming you might want to use attributes as well
    const data = Buffer.from(message.data, 'base64').toString('utf-8');
    const recommendation = JSON.parse(data);

    if (recommendation && recommendation.model && recommendation.component_type && recommendation.recommendation) {
        console.log(`Received recommendation for Model: ${recommendation.model}, Component Type: ${recommendation.component_type}`);
        recommendation.recommendation.forEach((rec, index) => {
            console.log(`Recommendation #${index + 1}:`);
            console.log(`- Model: ${rec.Model}`);
            console.log(`- Benchmark: ${rec.Benchmark}`);
        });

        // Call the processRecommendation function
        processRecommendation(recommendation);

        console.log("Processing the detailed recommendation...");
    } else {
        console.log("Received message does not contain a valid recommendation.");
    }

    // Respond to Google Cloud Pub/Sub to acknowledge receipt of the message
    res.status(204).send();
});

// Start your Express server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});