// UpgradePreferencePage.js
import React, { useState } from 'react';

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
      { name: 'performance', label: 'What is the desired Performance (%)?', type: 'number' },
      { name: 'budget', label: 'What is the budget ($)?', type: 'number' },
    ],
    GPU: [
      { name: 'performance', label: 'What is the desired Performance (%)?', type: 'number' },
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitting for ${hardwareType}: `, formData);
    // Submit data to server or process it further here
  };

  return (
    <div>
      {/* UI element to select different hardware type, e.g., dropdown */}
      <select onChange={(e) => setHardwareType(e.target.value)} value={hardwareType}>
        <option value="CPU">CPU</option>
        <option value="GPU">GPU</option>
        <option value="RAM">RAM</option>
        <option value="HDD">HDD</option>
        <option value="SSD">SSD</option>
      </select>

      <form onSubmit={handleSubmit}>
        <h1>{hardwareType}</h1>
        {hardwareFields[hardwareType].map((field) => (
          <div key={field.name} className="form-group">
            <label>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Next Step</button>
      </form>
    </div>
  );
};

export default UpgradePreferencePage;
