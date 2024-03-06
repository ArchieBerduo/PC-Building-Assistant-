import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../stylesheets/pcConfigSetup.css'; // Ensure correct path
import getUserInfo from "../../utilities/decodeJwt";

const PcConfigurationSetup = () => { // Rename function to start with uppercase letter
  const [user, setUser] = useState({});
  const [cpus, setCpus] = useState([]);
  const [gpus, setGpus] = useState([]);
  const [ssds, setSSDs] = useState([]);
  const [hdds, setHDDs] = useState([]);
  const [ram, setRAM] = useState([]);
  const [selectedComponents, setSelectedComponents] = useState({
    cpu: { id: '', name: '' },
    gpu: { id: '', name: '' },
    ssd: { id: '', name: '' },
    hdd: { id: '', name: '' },
    ram: { id: '', name: '' }
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cpusResponse, gpusResponse, hddsResponse, ssdsResponse, ramResponse] = await Promise.all([
          axios.get('http://localhost:8081/user/cpu'),
          axios.get('http://localhost:8081/user/gpu'),
          axios.get('http://localhost:8081/user/hdd'),
          axios.get('http://localhost:8081/user/ssd'),
          axios.get('http://localhost:8081/user/ram')
        ]);

        setCpus(cpusResponse.data);
        setGpus(gpusResponse.data);
        setHDDs(hddsResponse.data);
        setSSDs(ssdsResponse.data);
        setRAM(ramResponse.data);
      } catch (error) {
        console.error('Error fetching hardware data:', error);
      }
    };

    fetchData();
    setUser(getUserInfo());
  }, []);

  const handleSelectComponent = (componentType, selectedValue, selectedName) => {
    setSelectedComponents(prevState => ({
      ...prevState,
      [componentType]: { id: selectedValue, name: selectedName }
    }));
  };

  const handleFinish = () => {
    // Correctly assemble the payload using the detailed structure
    const payload = {
      cpu: selectedComponents.cpu.name,
      gpu: selectedComponents.gpu.name,
      ssd: selectedComponents.ssd.name,
      hdd: selectedComponents.hdd.name,
      ram: selectedComponents.ram.name,
      email: user.email, // Assuming 'user' state holds the email and username
      username: user.username
    };

    // Endpoint URL
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/saveComponents`;

    // Use axios to send a POST request with the modified payload
    axios.post(url, payload)
      .then(response => {
        console.log('Success:', response.data);
        navigate('/success-page');
      })
      .catch(error => {
        console.error('Error saving components:', error);
        alert('Failed to save components');
      });
  };

  return (
    <div className="upgrade-page-container">
      <div className="dropdown-container">
        <label htmlFor="cpu-select" className="dropdown-label">CPU:</label>
        <select
          id="cpu-select"
          name="cpu"
          className="dropdown"
          value={selectedComponents.cpu.id}
          onChange={(e) => handleSelectComponent('cpu', e.target.value, cpus.find(cpu => cpu._id === e.target.value).Model)}
        >
          <option value="" disabled>Select a CPU</option>
          {cpus.map(cpu => (
            <option key={cpu._id} value={cpu._id}>{cpu.Brand} {cpu.Model}</option>
          ))}
        </select>
      </div>

      <div className="dropdown-container">
        <label htmlFor="gpu-select" className="dropdown-label">GPU:</label>
        <select
          id="gpu-select"
          name="gpu"
          className="dropdown"
          value={selectedComponents.gpu.id}
          onChange={(e) => handleSelectComponent('gpu', e.target.value, gpus.find(gpu => gpu._id === e.target.value).Model)}
        >
          <option value="" disabled>Select a GPU</option>
          {gpus.map(gpu => (
            <option key={gpu._id} value={gpu._id}>{gpu.Brand} {gpu.Model}</option>
          ))}
        </select>
      </div>

      <div className="dropdown-container">
        <label htmlFor="hdd-select" className="dropdown-label">HDD:</label>
        <select
          id="hdd-select"
          name="hdd"
          className="dropdown"
          value={selectedComponents.hdd.id}
          onChange={(e) => handleSelectComponent('hdd', e.target.value, hdds.find(hdd => hdd._id === e.target.value).Model)}
        >
          <option value="" disabled>Select a HDD</option>
          {hdds.map(hdd => (
            <option key={hdd._id} value={hdd._id}>{hdd.Brand} {hdd.Model}</option>
          ))}
        </select>
      </div>

      <div className="dropdown-container">
        <label htmlFor="ssd-select" className="dropdown-label">SSD:</label>
        <select
          id="ssd-select"
          name="ssd"
          className="dropdown"
          value={selectedComponents.ssd.id}
          onChange={(e) => handleSelectComponent('ssd', e.target.value, ssds.find(ssd => ssd._id === e.target.value).Model)}
        >
          <option value="" disabled>Select a SSD</option>
          {ssds.map(ssd => (
            <option key={ssd._id} value={ssd._id}>{ssd.Brand} {ssd.Model}</option>
          ))}
        </select>
      </div>

      <div className="dropdown-container">
        <label htmlFor="ram-select" className="dropdown-label">RAM:</label>
        <select
          id="ram-select"
          name="ram"
          className="dropdown"
          value={selectedComponents.ram.id}
          onChange={(e) => handleSelectComponent('ram', e.target.value, ram.find(r => r._id === e.target.value).Model)}
        >
          <option value="" disabled>Select a RAM</option>
          {ram.map(r => (
            <option key={r._id} value={r._id}>{r.Brand} {r.Model}</option>
          ))}
        </select>
      </div>

      <button onClick={handleFinish}>Finish</button>
    </div>
  );
};

export default PcConfigurationSetup;
