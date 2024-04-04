import '../../stylesheets/UpgradeSelectionPage.css';
import React, { useEffect, useState } from 'react';

const UpgradeSelectionPage = () => {
    // Initialize the recommendations state with keys for each category
    const [recommendations, setRecommendations] = useState({
        costEfficient: '',
        balance: '',
        premium: '',
    });

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await fetch('/api/recommendations/latest-recommendation');
                const data = await response.json();

                // Assuming the API returns data in an array and you need to map it to your state
                // Adjust this logic based on how your data is structured
                const mappedRecommendations = data.reduce((acc, rec) => {
                    // Example: assuming rec has a 'category' key that could be 'costEfficient', 'balance', or 'premium'
                    acc[rec.category] = rec.details; // 'details' should contain the string or object you want to display
                    return acc;
                }, {...recommendations});

                setRecommendations(mappedRecommendations);
            } catch (error) {
                console.error("Failed to fetch recommendations:", error);
            }
        };

        fetchRecommendations();
    }, []);

    return (
        <div className="upgrade-selection-page">
            <h1 className="title">Upgrade Recommendations</h1>
            <div className="boxes-container">
                {/* Display each category with its corresponding recommendations */}
                <input className="sub-title-box cost-efficient" placeholder="Cost Efficient" value={recommendations.costEfficient} readOnly />
                <input className="sub-title-box balance" placeholder="Balance" value={recommendations.balance} readOnly />
                <input className="sub-title-box premium" placeholder="Premium" value={recommendations.premium} readOnly />
            </div>
            {/* Optionally, you can add more detailed text boxes for each category below, similar to your current structure */}
        </div>
    );
};

export default UpgradeSelectionPage;