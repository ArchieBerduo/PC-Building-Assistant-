import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/UpgradeSelectionPage.css';
import getUserInfo from "../../utilities/decodeJwt";

const UpgradeSelectionPage = () => {
    const [user, setUser] = useState({});
    const [recommendations, setRecommendations] = useState(null);
    const [selectedRecommendation, setSelectedRecommendation] = useState(null); // State to hold the selected recommendation
    const location = useLocation();
    const navigate = useNavigate();
    const { payload } = location.state || {};

    useEffect(() => {
        // Existing fetchRecommendations logic
    }, [payload]);

    const handleRecommendationClick = async (recommendation) => {
        // Set the selected recommendation for display
        setSelectedRecommendation(recommendation);

        const updatePayload = {
            username: user.username,
            email: user.email,
            componentType: recommendation.componentType,
            new_model: recommendation.new_model,
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/editPCConfig`, updatePayload);
            console.log('Update success:', response.data);
            // navigate('/privateUserProfile'); // Consider commenting this out to show the update first on this page
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

            {/* Display the selected configuration */}
            {selectedRecommendation && (
                <div className="selected-config-display" style={{ backgroundColor: '#2a2a2a', color: '#fff', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
                    <h2>Selected Configuration Update</h2>
                    <p>Component Type: {selectedRecommendation.componentType}</p>
                    <p>Current Model: {payload.selectedConfig[selectedRecommendation.componentType.toLowerCase()]}</p>
                    <p>New Model: {selectedRecommendation.new_model}</p>
                </div>
            )}
        </div>
    );
};

export default UpgradeSelectionPage;
