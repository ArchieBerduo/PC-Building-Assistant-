import '../../stylesheets/UpgradeSelectionPage.css';
import React, { useEffect, useState } from 'react';

const UpgradeSelectionPage = () => {
  // State to store recommendations
  const [recommendations, setRecommendations] = useState({
    costEfficient: '',
    balance: '',
    premium: '',
  });

  useEffect(() => {
    // Fetch recommendations when the component mounts
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/recommendations`);
        if (!response.ok) throw new Error('Failed to fetch recommendations');
        const data = await response.json();
        setRecommendations({
          costEfficient: data.costEfficient,
          balance: data.balance,
          premium: data.premium,
        });
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="upgrade-selection-page">
      <h1 className="title">CPU</h1>
      <div className="boxes-container">
        <input className="sub-title-box cost-efficient" placeholder="Cost Efficient" value={recommendations.costEfficient} readOnly />
        <input className="sub-title-box balance" placeholder="Balance" value={recommendations.balance} readOnly />
        <input className="sub-title-box premium" placeholder="Premium" value={recommendations.premium} readOnly />
      </div>
      <div className="boxes-container">
        <input className="text-box cost-efficient" placeholder="Cost Efficient" value={recommendations.costEfficient} readOnly />
        <input className="text-box balance" placeholder="Balance" value={recommendations.balance} readOnly />
        <input className="text-box premium" placeholder="Premium" value={recommendations.premium} readOnly />
      </div>
    </div>
  );
};

export default UpgradeSelectionPage;