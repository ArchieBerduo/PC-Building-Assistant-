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
              // Ensure the correct endpoint, considering the full URL if needed
              const response = await fetch('/recommendations/receive-recommendation');
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
  
              const mappedRecommendations = data.reduce((acc, rec) => {
                  acc[rec.category] = rec.details;
                  return acc;
              }, {...recommendations});
  
              setRecommendations(mappedRecommendations);
          } catch (error) {
              console.error("Failed to fetch recommendations:", error);
              // Consider setting an error state and displaying it to the user
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