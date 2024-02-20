// UpgradePreferencePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../stylesheets/UpgradePreferencePage.css';

const UpgradePreferencePage = () => {
    const [hardwareType, setHardwareType] = useState('CPU');
    const [formData, setFormData] = useState({
      performance: '',
      budget: '',
      speed: '',
      storage: '',
      type: '',
    });
  

  const hardwareFields = {
    CPU: [
      { name: 'performance', label: 'What is the desired Performance (%)?', type: 'dropdown', options: ['Select','15%', '30%', '45%'] },
      { name: 'budget', label: 'What is the budget ($)?', type: 'number' },
    ],
    GPU: [
      { name: 'performance', label: 'What is the desired Performance (%)?', type: 'dropdown', options: ['Select','15%', '30%', '45%'] },
      { name: 'budget', label: 'What is the budget ($)?', type: 'number' },
    ],
    RAM: [
      { name: 'speed', label: 'What is the desired Speed (MHz)?', type: 'number' },
      { name: 'budget', label: 'What is the budget ($)?', type: 'number' },
    ],
    HDD: [
      { name: 'storage', label: 'Desired Storage Space (TB)', type: 'number' },
      { name: 'type', label: 'Is it HDD or SSD?', type: 'text' },
    ],
    SSD: [
      { name: 'storage', label: 'Desired Storage Space (TB)', type: 'number' },
      { name: 'type', label: 'Is it HDD or SSD?', type: 'text' },
    ],
  };

  const navigate = useNavigate(); // Updated to useNavigate


const handleInputChange = (event) => {
  const { name, value } = event.target;

  // Check if the input value is for the budget field
  if (name === 'budget') {
      // Allow only numbers and a dot
      const numericalValue = value.replace(/[^\d.]/g, '');
      
      // Update the form data with the sanitized input value
      setFormData(prevFormData => ({
          ...prevFormData,
          [name]: numericalValue,
      }));
  } else {
      // Update the form data with the input value for other fields
      setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value,
      }));
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  console.log(`Submitting for ${hardwareType}: `, formData);
  // Submit data to server or process it further here
  navigate('/upgradeSelection');// Step 3: Redirect to UpgradeSelectionPage
};

return (
  <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
          <div className="title-dropdown-container">
              <select
                  className="hardware-select-title"
                  onChange={(e) => setHardwareType(e.target.value)}
                  value={hardwareType}
                  name="hardwareType"
              >
                  <option value="CPU">CPU</option>
                  <option value="GPU">GPU</option>
                  <option value="RAM">RAM</option>
                  <option value="HDD">HDD</option>
                  <option value="SSD">SSD</option>
              </select>
          </div>
          <div className="inputs-row">
              {hardwareFields[hardwareType].map((field) => (
                  <div key={field.name} className="form-group">
                      <label className="input-label">{field.label}</label>
                      {field.type === 'dropdown' ? (
                          <select
                              className="input-field"
                              name={field.name}
                              value={formData[field.name] || ''}
                              onChange={handleInputChange}
                          >
                              {field.options.map(option => (
                                  <option key={option} value={option}>{option}</option>
                              ))}
                          </select>
                      ) : (
                        <input
                        className="input-field"
                        type="text" // Change the type to text
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        placeholder={`Enter ${field.label}`}
                        />
                      )}
                  </div>
              ))}
          </div>
          <button className="submit-button" type="submit">Next Step</button>
      </form>
  </div>
);

};

export default UpgradePreferencePage;