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
    const navigate = useNavigate(); // Updated to useNavigate
    const { selectedConfig } = location.state || {};

     // Redirect the user to the configuration selection page if no configuration is selected
     useEffect(() => {
      if (!selectedConfig) {
          navigate('/chooseConfig'); // Adjust the route as necessary
      }
  }, [navigate, selectedConfig]); // Dependencies array includes navigate and selectedConfig

  //const hardwareFields = {
    //CPU: [
      //{ name: 'performance', label: 'What is the desired Performance (%)?', type: 'dropdown', options: ['Select','15%', '30%', '45%'] },
     // { name: 'budget', label: 'What is the budget ($)?', type: 'number' },
   // ],
  //  GPU: [
    //  { name: 'performance', label: 'What is the desired Performance (%)?', type: 'dropdown', options: ['Select','15%', '30%', '45%'] },
    //  { name: 'budget', label: 'What is the budget ($)?', type: 'number' },
   // ],
  //  RAM: [
   //   { name: 'speed', label: 'What is the desired Speed (MHz)?', type: 'number' },
   //   { name: 'budget', label: 'What is the budget ($)?', type: 'number' },
  //  ],
   // HDD: [
   //   { name: 'storage', label: 'Desired Storage Space (TB)', type: 'number' },
    //  { name: 'type', label: 'Is it HDD or SSD?', type: 'text' },
   // ],
   // SSD: [
      //{ name: 'storage', label: 'Desired Storage Space (TB)', type: 'number' },
     // { name: 'type', label: 'Is it HDD or SSD?', type: 'text' },
   // ],
 // };

 



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

  // Your existing form submission logic here...
  const selectedComponentModel = selectedConfig ? selectedConfig[hardwareType.toLowerCase()] : null;
  const payload = {
    model: selectedComponentModel,
    componentType: hardwareType,
  };

  try {
    const response = await fetch('https://us-central1-watchful-net-416319.cloudfunctions.net/PC_Building_Assistant_Communicator', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(`Network response was not ok: ${response.status} - ${errorResponse}`);
    }

    const data = await response.json();
    console.log('Success:', data);

    // Navigate to UpgradeSelectionPage after successful submission
    navigate('/upgradeSelection', { state: { payload } });
  } catch (error) {
    console.error('Error:', error);
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
                <button className="submit-button" type="submit">Next Step</button>
            </form>
        </div>
    );
};

export default UpgradePreferencePage;