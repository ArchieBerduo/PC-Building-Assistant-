// UpgradePreferencePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
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
  
    const location = useLocation();
    const { selectedConfig } = location.state || {};


    
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

const handleSubmit = async (event) => {
  event.preventDefault();
  
  // Assuming `selectedConfig` is your form's state that holds the selected configuration
  // And `hardwareType` is the state that holds the type of hardware selected (e.g., "CPU")
  const selectedComponentModel = selectedConfig ? selectedConfig[hardwareType.toLowerCase()] : null;

  const payload = {
    model: selectedComponentModel,
    type: hardwareType, // Assuming this variable is available and contains the type like "CPU" or "GPU"
  };

  try {
    const response = await fetch('https://us-central1-watchful-net-416319.cloudfunctions.net/PC_Building_Assistant_Request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Success:', data);
    // Here, you can handle the response from your Cloud Function, such as updating the UI or navigating to another page
  } catch (error) {
    console.error('Error:', error);
    // Here, handle any errors that occurred during the fetch operation
  }
};

return (
  <div className="container">
    {selectedConfig && (
      <div className="selected-config-display" style={{ backgroundColor: '#2a2a2a', color: '#fff', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
        <h2>Selected Configuration</h2>
        <p>CPU: {selectedConfig.cpu}</p>
        <p>GPU: {selectedConfig.gpu}</p>
        <p>HDD: {selectedConfig.hdd}</p>
        <p>SSD: {selectedConfig.ssd}</p>
        <p>RAM: {selectedConfig.ram}</p>
      </div>
    )}

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
                      type="text" // Adjust the input type as needed
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