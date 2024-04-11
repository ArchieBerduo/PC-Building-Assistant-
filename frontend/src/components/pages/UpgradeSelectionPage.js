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
        const userInfo = getUserInfo();
        setUser(userInfo); // Set user state

        console.log("Payload received on UpgradeSelectionPage:", payload);
        if (payload && payload.selectedConfig) {
            setSelectedConfig(payload.selectedConfig);  // Ensure selected configuration is set
        }

        // Function to fetch recommendations
        const fetchRecommendations = async () => {
            if (payload && payload.componentType && payload.model) {
                const url = `${process.env.REACT_APP_BACKEND_URL}/pullRecommendations?componentType=${encodeURIComponent(payload.componentType)}&model=${encodeURIComponent(payload.model)}&email=${encodeURIComponent(userInfo.email)}&username=${encodeURIComponent(userInfo.username)}`;
                console.log("Request URL:", url);
                try {
                    const response = await axios.get(url);
                    console.log("Received data from pullRecommendations:", response.data);
                    if (response.data && response.data.length > 0) {
                        setRecommendations(response.data);
                    } else {
                        throw new Error('No recommendations found');
                    }
                } catch (error) {
                    console.error("Failed to fetch recommendations:", error);
                    setRecommendations([]);  // Fallback to an empty array on error
                }
            } else {
                console.log("Insufficient data for fetching recommendations.");
                setRecommendations([]);  // Ensure we handle cases where payload is insufficient
            }
        };

        fetchRecommendations();
    }, [payload]); // React to changes in payload

    const handleRecommendationClick = async (recommendation) => {
        setSelectedRecommendation(recommendation);
        const updatedConfig = { ...selectedConfig, [recommendation.componentType.toLowerCase()]: recommendation.new_model };
        setSelectedConfig(updatedConfig);
    
        const updatePayload = {
            username: user.username,
            email: user.email,
            componentType: recommendation.componentType,
            new_model: recommendation.new_model,
            selectedConfig: selectedConfig // Include the entire selectedConfig in the payload
        };
    
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/editPCConfig`, updatePayload);
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

            {selectedConfig ? (
                <div className="selected-config-display" style={{ backgroundColor: '#2a2a2a', color: '#fff', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
                    <h2>{selectedRecommendation ? "Updated Configuration" : "Current Configuration"}</h2>
                    <p>CPU: {selectedConfig.cpu}</p>
                    <p>GPU: {selectedConfig.gpu}</p>
                    <p>HDD: {selectedConfig.hdd}</p>
                    <p>SSD: {selectedConfig.ssd}</p>
                    <p>RAM: {selectedConfig.ram}</p>
                </div>
            ) : <p>Loading configuration...</p>}
        </div>
    );
};

export default UpgradeSelectionPage;