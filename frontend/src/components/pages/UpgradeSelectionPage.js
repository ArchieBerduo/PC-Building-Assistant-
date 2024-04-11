import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/UpgradeSelectionPage.css';
import getUserInfo from "../../utilities/decodeJwt";

const UpgradeSelectionPage = () => {
    const [user, setUser] = useState({});
    const [recommendations, setRecommendations] = useState(null);
    const [selectedRecommendation, setSelectedRecommendation] = useState(null);
    const [selectedConfig, setSelectedConfig] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { payload } = location.state || {};

    useEffect(() => {
        setUser(getUserInfo());
        if (payload && payload.selectedConfig) {
            setSelectedConfig(payload.selectedConfig);
        }
        // You should add logic here to fetch recommendations based on the selectedConfig
    }, [payload]);

    const handleRecommendationClick = async (recommendation) => {
        setSelectedRecommendation(recommendation);
        const updatedConfig = { ...selectedConfig, [recommendation.componentType.toLowerCase()]: recommendation.new_model };
        setSelectedConfig(updatedConfig);

        const updatePayload = {
            username: user.username,
            email: user.email,
            componentType: recommendation.componentType,
            new_model: recommendation.new_model,
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/editPCConfig`, updatePayload);
            console.log('Update success:', response.data);
            // Optionally navigate or update UI
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
            ) : (
                <p>No recommendations found.</p>
            )}

            {/* Display the original or updated configuration dynamically */}
            <div className="selected-config-display" style={{ backgroundColor: '#2a2a2a', color: '#fff', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
                <h2>{selectedRecommendation ? "Updated Configuration" : "Current Configuration"}</h2>
                <p>CPU: {selectedConfig ? selectedConfig.cpu : 'Loading...'}</p>
                <p>GPU: {selectedConfig ? selectedConfig.gpu : 'Loading...'}</p>
                <p>HDD: {selectedConfig ? selectedConfig.hdd : 'Loading...'}</p>
                <p>SSD: {selectedConfig ? selectedConfig.ssd : 'Loading...'}</p>
                <p>RAM: {selectedConfig ? selectedConfig.ram : 'Loading...'}</p>
            </div>
        </div>
    );
};

export default UpgradeSelectionPage;
