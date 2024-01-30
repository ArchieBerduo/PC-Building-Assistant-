import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import getUserInfo from '../../utilities/decodeJwt'
import '../../stylesheets/UpgradePage.css';
const UpgradePage = () => {
    return (
      <div className="component-selection">
        <form className="component-form">
          <div className="form-row">
            <label>
              Enter your CPU
              <select name="cpu">
                {/* Populate with actual options */}
                <option value="cpu1">CPU 1</option>
                <option value="cpu2">CPU 2</option>
                {/* ... more options ... */}
              </select>
            </label>
            <label>
              Enter your GPU
              <select name="gpu">
                {/* Populate with actual options */}
                <option value="gpu1">GPU 1</option>
                <option value="gpu2">GPU 2</option>
                {/* ... more options ... */}
              </select>
            </label>
            <label>
              Enter your Motherboard
              <select name="motherboard">
                {/* Populate with actual options */}
                <option value="mobo1">Motherboard 1</option>
                <option value="mobo2">Motherboard 2</option>
                {/* ... more options ... */}
              </select>
            </label>
            <label>
              Enter your Memory
              <select name="memory">
                {/* Populate with actual options */}
                <option value="ram1">RAM 1</option>
                <option value="ram2">RAM 2</option>
                {/* ... more options ... */}
              </select>
            </label>
            <label>
              Enter your Storage
              <select name="storage">
                {/* Populate with actual options */}
                <option value="storage1">Storage 1</option>
                <option value="storage2">Storage 2</option>
                {/* ... more options ... */}
              </select>
            </label>
          </div>
          <button type="submit">Finished</button>
        </form>
      </div>
    );
  };
  export default UpgradePage;