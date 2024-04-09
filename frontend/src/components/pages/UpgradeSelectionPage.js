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
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/pullRecommendations?componentType=${encodeURIComponent(payload.componentType)}&model=${encodeURIComponent(payload.model)}`);
                
                console.log("Received data from pullRecommendations:", response.data);
                
                if (!response.data || response.data.length === 0) {
                    throw new Error('No recommendations found');
                }
                
                setRecommendations(response.data);
            } catch (error) {
                console.error("Failed to fetch recommendations:", error.response ? error.response.data : error.message);
                setRecommendations([]); // Set to an empty array on error
            }
        };

        fetchRecommendations();
    }, [payload]); // Dependency on payload ensures fetchRecommendations is called when payload changes

    return (
        <div className="upgrade-selection-page">
            <h1 className="title">Upgrade Recommendations</h1>
            {recommendations === null ? (
                <p>Loading recommendations...</p>
            ) : recommendations.length > 0 ? (
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