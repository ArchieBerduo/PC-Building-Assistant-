import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import '../../stylesheets/UpgradeSelectionPage.css';

const UpgradeSelectionPage = () => {
    // Initialize the recommendations state as an array
    const [recommendations, setRecommendations] = useState([]);

    // Access the navigation state
    const location = useLocation();
    const { payload } = location.state || {}; // Extract the payload

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
              const response = await fetch('/latest-recommendations', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                // Include both model and type in the payload
                body: JSON.stringify({
                  model: payload.model, // Assuming payload.model contains the model
                  type: payload.type, // Assuming payload.type contains the hardware type
                }),
              });
          
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              console.log("Received data:", data);
              setRecommendations(data || []);
            } catch (error) {
              console.error("Failed to fetch latest recommendations:", error);
            }
          };
          

        // Call fetchRecommendations with the model type from the payload, if available
        if (payload && payload.model) {
            fetchRecommendations(payload.model);
        }
    }, [payload]); // Depend on the payload so this effect runs when the payload changes

    return (
        <div className="upgrade-selection-page">
            <h1 className="title">Upgrade Recommendations</h1>
            {recommendations.length > 0 ? (
                <div>
                    {recommendations.map((rec, index) => (
                        <div key={index} className="recommendation-box">
                            <p>Recommendation #{index + 1} for {rec.increase} increase:</p>
                            <p>- Model: {rec.model}</p>
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