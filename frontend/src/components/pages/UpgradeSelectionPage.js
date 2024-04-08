import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/UpgradeSelectionPage.css';

const UpgradeSelectionPage = () => {
    const [recommendations, setRecommendations] = useState(null); // Initialize to null
    const location = useLocation();
    const { payload } = location.state || {}; 

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const queryString = `model=${encodeURIComponent(payload.model)}&componentType=${encodeURIComponent(payload.componentType)}`;
                const url = `${process.env.REACT_APP_BACKEND_URL}/pullRecommendations?${queryString}`;
                
                const response = await axios.get(url);
                
                // Log the data received from the pullRecommendations endpoint
                console.log("Received data from pullRecommendations:", response.data);
                
                // Directly set recommendations, could be empty array or filled
                setRecommendations(response.data);
            } catch (error) {
                console.error("Failed to fetch recommendations:", error.response ? error.response.data : error.message);
                setRecommendations([]); // Set to empty array on error
            }
        };
    
        if (payload && payload.model && payload.componentType) {
            fetchRecommendations();
        }
    }, [payload]);
    

    return (
        <div className="upgrade-selection-page">
            <h1 className="title">Upgrade Recommendations</h1>
            {/* Check for null to ensure fetch was attempted */}
            {recommendations === null ? (
                <p>Loading recommendations...</p> // Or any other loading state representation
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

