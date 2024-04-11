import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../stylesheets/UpgradePreferencePage.css';
import getUserInfo from "../../utilities/decodeJwt";

const UpgradePreferencePage = () => {
    const [user, setUser] = useState({});
    const [hardwareType, setHardwareType] = useState('CPU');
    const [formData, setFormData] = useState({
        performance: '',
        budget: '',
        speed: '',
        storage: '',
        type: '',
    });
  
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedConfig } = location.state || {};

    useEffect(() => {
        if (!selectedConfig) {
            navigate('/chooseConfig'); // Redirect if no configuration is selected
        }
        setUser(getUserInfo());
    }, [navigate, selectedConfig]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const filteredValue = name === 'budget' ? value.replace(/[^\d.]/g, '') : value;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value, // Directly set value for non-budget inputs
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const selectedComponentModel = selectedConfig ? selectedConfig[hardwareType.toLowerCase()] : null;
        const payload = {
            model: selectedComponentModel,
            componentType: hardwareType,
            username: user.username,
            email: user.email,
            selectedConfig: selectedConfig,
        };

        try {
            const response = await fetch('https://us-central1-watchful-net-416319.cloudfunctions.net/PC_Building_Assistant_Communicator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
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
                        onChange={handleInputChange}
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
