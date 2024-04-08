import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/UpgradeSelectionPage.css';

const UpgradeSelectionPage = () => {
    const [recommendations, setRecommendations] = useState([]);
    const location = useLocation();
    const { payload } = location.state || {}; // Extract the payload

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                // Use process.env.REACT_APP_BACKEND_URL to dynamically set the backend URL
                const queryString = `model=${encodeURIComponent(payload.model)}&componentType=${encodeURIComponent(payload.componentType)}`;
                const url = `${process.env.REACT_APP_BACKEND_URL}/pullRecommendations?${queryString}`;
                const response = await axios.get(url);

                setRecommendations(response.data);
            } catch (error) {
                console.error("Failed to fetch recommendations:", error.response ? error.response.data : error.message);
            }
        };

        if (payload && payload.model && payload.componentType) {
            fetchRecommendations();
        }
    }, [payload]); // Re-fetch recommendations if payload changes

    return (
        <div className="upgrade-selection-page">
            <h1 className="title">Upgrade Recommendations</h1>
            {recommendations.length > 0 ? (
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

