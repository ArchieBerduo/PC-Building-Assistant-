const express = require('express');
const bodyParser = require('body-parser');
const { processRecommendation } = require('./RecommendationListener'); // Adjust the path as necessary

const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Define the endpoint that will receive recommendations directly
app.post('/receive-recommendation', (req, res) => {
    const recommendation = req.body; // Directly use the JSON body as the recommendation

    if (recommendation && recommendation.model && recommendation.component_type && recommendation.recommendation) {
        console.log(`Received recommendation for Model: ${recommendation.model}, Component Type: ${recommendation.component_type}`);
        recommendation.recommendation.forEach((rec, index) => {
            console.log(`Recommendation #${index + 1}:`);
            console.log(`- Model: ${rec.Model}`);
            console.log(`- Benchmark: ${rec.Benchmark}`);
        });

        // Call the processRecommendation function to handle the recommendation
        processRecommendation(recommendation);

        console.log("Processing the detailed recommendation...");

        // Respond to acknowledge receipt of the recommendation
        res.status(200).send({message: "Recommendation received and processed."});
    } else {
        console.log("Received request does not contain a valid recommendation.");
        res.status(400).send({error: "Invalid recommendation format."});
    }
});

// Start your Express server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});