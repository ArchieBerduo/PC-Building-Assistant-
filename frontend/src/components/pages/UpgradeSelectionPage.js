import React, { useEffect, useState } from 'react';
import '../../stylesheets/UpgradeSelectionPage.css';

const UpgradeSelectionPage = () => {
    // Initialize the recommendations state as an array
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await fetch('/latest-recommendations/latest-recommendations');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Received data:", data); // Log to inspect the received data

                setRecommendations(data || []);
            } catch (error) {
                console.error("Failed to fetch latest recommendations:", error);
            }
        };

        fetchRecommendations();
    }, []);

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