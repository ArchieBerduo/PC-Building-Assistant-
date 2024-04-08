import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/UpgradeSelectionPage.css';

const UpgradeSelectionPage = () => {
    const [recommendations, setRecommendations] = useState(null); // Initialize to null to differentiate from empty response
    const location = useLocation();
    const { payload } = location.state || {}; // Ensure payload is defined or default to an empty object

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                // Directly include model and componentType in the URL
                const url = `${process.env.REACT_APP_BACKEND_URL}/pullRecommendations?componentType=${encodeURIComponent(payload.componentType)}&model=${encodeURIComponent(payload.model)}`;
    
                // Fetch data using axios
                const response = await axios.get(url);
    
                // Log received data for debugging
                console.log("Received data from pullRecommendations:", response.data);
    
                // Update state with the fetched data
                setRecommendations(response.data);
            } catch (error) {
                // Log any errors and set recommendations to an empty array to indicate no data was found
                console.error("Failed to fetch recommendations:", error.response ? error.response.data : error.message);
                setRecommendations([]);
            }
        };
    
        // Trigger data fetch if the necessary payload data is available
        if (payload && payload.model && payload.componentType) {
            fetchRecommendations();
        }
    }, [payload]); 
    return (
        <div className="upgrade-selection-page">
            <h1 className="title">Upgrade Recommendations</h1>
            {/* Conditional rendering based on the state of the recommendations */}
            {recommendations === null ? (
                <p>Loading recommendations...</p>
            ) : recommendations.length ? (
                <div>
                    {recommendations.map((rec, index) => (
                        <div key={index} className="recommendation-box">
                            <p>Recommendation #{index + 1}</p>
                            <p>- New Model: {rec.new_model}</p>
                            <p>- Benchmark: {rec.benchmark}</p>
                            <p>- Increase: {rec.Increase}%</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No recommendations found.</p>
            )}
        </div>
    );
};

export default UpgradeSelectionPage;


