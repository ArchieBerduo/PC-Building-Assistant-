import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/UpgradeSelectionPage.css';

const UpgradeSelectionPage = () => {
    const [recommendations, setRecommendations] = useState(null); // Initialize to null to differentiate from empty response
    const location = useLocation();
    const { payload } = location.state || {}; // Ensure payload is defined or default to an empty object

    useEffect(() => {
        console.log("Received payload:", payload);
    
        const fetchRecommendations = async () => {
            try {
                // Constructing the URL with payload details included in the query parameters
                const url = `${process.env.REACT_APP_BACKEND_URL}/pullRecommendations?componentType=${encodeURIComponent(payload.componentType)}&model=${encodeURIComponent(payload.model)}`;
                console.log("Request URL:", url); // Log the full request URL
                const response = await axios.get(url);
                
                console.log("Received data from pullRecommendations:", response.data);
                
                // Checking if the data exists and has at least one recommendation
                if (response.data && response.data.length > 0) {
                    setRecommendations(response.data);
                } else {
                    // If the data is not as expected, throw an error to trigger the catch block
                    throw new Error('No recommendations found');
                }
            } catch (error) {
                console.error("Failed to fetch recommendations:", error); // Log the entire error object
                setRecommendations([]); // Set to an empty array on error
            }
        };
    
        fetchRecommendations();
    }, [payload]);
    

    const handleRecommendationClick = (recommendation) => {
        console.log("Clicked recommendation:", recommendation);
        // Here you can do more, like setting state to show more details, or navigate to a detail view, etc.
    };

    return (
        <div className="upgrade-selection-page">
            <h1 className="title">Upgrade Recommendations</h1>
            {recommendations === null ? (
                <p>Loading recommendations...</p>
            ) : recommendations.length > 0 ? (
                <div className="boxes-container">
                    {recommendations.map((rec, index) => (
                        // Using a button here for clickable functionality; style as needed
                        <button key={index} className="recommendation-box" onClick={() => handleRecommendationClick(rec)}>
                            <p>Recommendation #{index + 1}</p>
                            <p>New Model: {rec.new_model}</p>
                            <p>Benchmark: {rec.benchmark}</p>
                            <p>Preformance Increase: {rec.Increase}%</p>
                        </button>
                    ))}
                </div>
            ) : (
                <p>No recommendations found.</p>
            )}
        </div>
    );
};

export default UpgradeSelectionPage;