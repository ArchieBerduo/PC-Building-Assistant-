import '../../stylesheets/UpgradeSelectionPage.css';
import React from 'react';

const UpgradeSelectionPage = () => {
  return (
    <div className="upgrade-selection-page">
      <h1 className="title">CPU</h1>
      <div className="boxes-container">
        <input className="sub-title-box cost-efficient" placeholder="Cost Efficient" />
        <input className="sub-title-box balance" placeholder="Balance" />
        <input className="sub-title-box premium" placeholder="Premium" />
      </div>
      <div className="boxes-container">
        <input className="text-box cost-efficient" placeholder="Cost Efficient" />
        <input className="text-box balance" placeholder="Balance" />
        <input className="text-box premium" placeholder="Premium" />
      </div>
    </div>
  );
};

export default UpgradeSelectionPage;
