import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/UpgradeSelectionPage.css';
import getUserInfo from "../../utilities/decodeJwt";

const UpgradeSelectionPage = () => {
    const [user, setUser] = useState({});
    const [recommendations, setRecommendations] = useState(null);
    const [selectedConfig, setSelectedConfig] = useState(null); // Holds the original configuration
    const [displayConfig, setDisplayConfig] = useState(null);  // Used for rendering updates to the UI
    const location = useLocation();
    const navigate = useNavigate();
    const { payload } = location.state || {};

    useEffect(() => {
        const userInfo = getUserInfo();
        setUser(userInfo); // Set user state

        if (payload && payload.selectedConfig) {
            setSelectedConfig(payload.selectedConfig);  // Set both configurations initially to the same
            setDisplayConfig(payload.selectedConfig);
        }

        const fetchRecommendations = async () => {
            if (payload && payload.componentType && payload.model) {
                const url = `${process.env.REACT_APP_BACKEND_URL}/pullRecommendations?componentType=${encodeURIComponent(payload.componentType)}&model=${encodeURIComponent(payload.model)}&email=${encodeURIComponent(userInfo.email)}&username=${encodeURIComponent(userInfo.username)}`;
                try {
                    const response = await axios.get(url);
                    if (response.data && response.data.length > 0) {
                        setRecommendations(response.data);
                    } else {
                        throw new Error('No recommendations found');
                    }
                } catch (error) {
                    console.error("Failed to fetch recommendations:", error);
                    setRecommendations([]); // Fallback to an empty array on error
                }
            }
        };

        fetchRecommendations();
    }, [payload]); // React to changes in payload

    const handleRecommendationClick = async (recommendation) => {
        const updatedConfig = { ...displayConfig, [recommendation.componentType.toLowerCase()]: recommendation.new_model };
        setDisplayConfig(updatedConfig); // Only update the display configuration

        // This payload should carry the original selected configuration prior to any changes
        const updatePayload = {
            username: user.username,
            email: user.email,
            componentType: recommendation.componentType,
            new_model: recommendation.new_model,
            selectedConfiguration: selectedConfig // Send the original configuration
        };

        console.log("Sending payload:", updatePayload); // Debug to check the payload values

        try {
            const response = await axios.post('https://pc-building-assistant-backend.onrender.com/editPCConfig', updatePayload);
            console.log('Update success:', response.data);
            navigate('/privateUserProfile'); // Navigate after successful update
        } catch (error) {
            console.error('Failed to update configuration:', error.response || error.message);
        }
    };

    return (
        <div className="upgrade-selection-page">
            <h1 className="title">Upgrade Recommendations</h1>
            {recommendations && recommendations.length > 0 ? (
                <div className="boxes-container">
                    {recommendations.map((rec, index) => (
                        <button key={index} className="recommendation-box" onClick={() => handleRecommendationClick(rec)}>
                            <p>Recommendation #{index + 1}</p>
                            <p>New Model: {rec.new_model}</p>
                            <p>Benchmark: {rec.benchmark}</p>
                            <p>Performance Increase: {rec.Increase}%</p>
                        </button>
                    ))}
                </div>
            ) : <p>No recommendations found.</p>}

            {displayConfig ? (
                <div className="selected-config-display" style={{ backgroundColor: '#2a2a2a', color: '#fff', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
                    <h2>Current Configuration</h2>
                    <p>CPU: {displayConfig.cpu}</p>
                    <p>GPU: {displayConfig.gpu}</p>
                    <p>HDD: {displayConfig.hdd}</p>
                    <p>SSD: {displayConfig.ssd}</p>
                    <p>RAM: {displayConfig.ram}</p>
                </div>
            ) : <p>Loading configuration...</p>}
        </div>
    );
};

export default UpgradeSelectionPage;
