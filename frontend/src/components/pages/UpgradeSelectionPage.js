import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../stylesheets/UpgradeSelectionPage.css';

const UpgradeSelectionPage = () => {
    const [recommendations, setRecommendations] = useState([]);
    const location = useLocation();
    const { payload } = location.state || {}; // Extract the payload

    useEffect(() => {
      const fetchRecommendations = async () => {
        try {
            // Adjusted queryString to use payload.componentType instead of payload.type
            const queryString = `model=${encodeURIComponent(payload.model)}&componentType=${encodeURIComponent(payload.componentType)}`;
    
            const response = await fetch(`/pullRecommendations?${queryString}`, {
                method: 'GET',
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setRecommendations(data);
        } catch (error) {
            console.error("Failed to fetch recommendations:", error);
        }
      };
      
      if (payload && payload.model && payload.componentType) { // Check for both model and componentType
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
                            <p>Recommendation #{index + 1} for {rec.Increase}% increase:</p>
                            <p>- Model: {rec.new_model}</p> {/* Adjusted to rec.new_model */}
                            <p>- Benchmark: {rec.benchmark}</p>
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