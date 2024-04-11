import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/UpgradeSelectionPage.css';
import getUserInfo from "../../utilities/decodeJwt";

const UpgradeSelectionPage = () => {
    const [user, setUser] = useState({});
    const [recommendations, setRecommendations] = useState(null);
    const location = useLocation();
    const { payload } = location.state || {};

    useEffect(() => {
        console.log("Received payload:", payload);

        const { selectedConfig } = payload;
        const userInfo = getUserInfo(); // Get current user's information
        setUser(userInfo); // Set user state

        const fetchRecommendations = async () => {
            try {
                // Construct the URL with payload details and current user's email and username
                const url = `${process.env.REACT_APP_BACKEND_URL}/pullRecommendations?componentType=${encodeURIComponent(payload.componentType)}&model=${encodeURIComponent(payload.model)}&email=${encodeURIComponent(userInfo.email)}&username=${encodeURIComponent(userInfo.username)}`;
                console.log("Request URL:", url); // Log the full request URL
                const response = await axios.get(url);

                console.log("Received data from pullRecommendations:", response.data);

                if (response.data && response.data.length > 0) {
                    setRecommendations(response.data);
                } else {
                    throw new Error('No recommendations found');
                }
            } catch (error) {
                console.error("Failed to fetch recommendations:", error);
                setRecommendations([]); // Fallback to an empty array on error
            }
        };

        fetchRecommendations();
    }, [payload]); // Dependency array includes payload only since userInfo is derived inside useEffect


    const handleRecommendationClick = (recommendation) => {
        console.log("Clicked recommendation:", recommendation);
        // Additional actions on recommendation click
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