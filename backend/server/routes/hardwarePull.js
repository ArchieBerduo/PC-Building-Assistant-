const express = require('express');
const router = express.Router();
const fs = require('fs'); // Import fs module
const path = require('path'); // Import path module
const CPU = require('../models/CPUType');
const GPU = require('../models/GPUType');
const HDD = require('../models/HDDType');
const SSD = require('../models/SSDType');
const RAM = require('../models/RAMType');
const pcConfig = require('../models/userPc');

// CPU Endpoint to retrieve CPU data from MongoDB
router.get('/cpu', async (req, res) => {
    try {
        // Query MongoDB to retrieve only the Model field
        const cpuModels = await CPU.find({}, 'Brand Model');

        // Return the retrieved CPU models
        return res.json(cpuModels);
    } catch (error) {
        console.error("Error fetching CPU models:", error);
        return res.status(500).json({ error: "Error fetching CPU models." });
    }
});

router.get('/gpu', async (req, res) => {
    try {
        // Query MongoDB to retrieve only the Model field
        const gpuModels = await GPU.find({}, 'Model');

        // Return the retrieved GPU models
        return res.json(gpuModels);
    } catch (error) {
        console.error("Error fetching GPU models:", error);
        return res.status(500).json({ error: "Error fetching GPU models." });
    }
});

router.get('/hdd', async (req, res) => {
    try {
        // Query MongoDB to retrieve only the Model field
        const hddModels = await HDD.find({}, 'Model');

        // Return the retrieved HDD models
        return res.json(hddModels);
    } catch (error) {
        console.error("Error fetching HDD models:", error);
        return res.status(500).json({ error: "Error fetching HDD models." });
    }
});

router.get('/ssd', async (req, res) => {
    try {
        // Query MongoDB to retrieve only the Model field
        const ssdModels = await SSD.find({}, 'Model');

        // Return the retrieved HDD models
        return res.json(ssdModels);
    } catch (error) {
        console.error("Error fetching SSD models:", error);
        return res.status(500).json({ error: "Error fetching SSD models." });
    }
});

router.get('/ram', async (req, res) => {
    try {
        // Query MongoDB to retrieve only the Model field
        const ramModels = await RAM.find({}, 'Model');

        // Return the retrieved HDD models
        return res.json(ramModels);
    } catch (error) {
        console.error("Error fetching RAM models:", error);
        return res.status(500).json({ error: "Error fetching RAM models." });
    }
});

router.get('/pcConfigPull', async (req, res) => {
    try {
        // Query MongoDB to retrieve only the Model field
        const pcconfigurations = await pcConfig.find({}, 'email username');

        // Return the retrieved HDD models
        return res.json(pcconfigurations);
    } catch (error) {
        console.error("Error fetching Pc configuration:", error);
        return res.status(500).json({ error: "Error fetching Pc configuration." });
    }
});

router.get('/pcConfiguration', async (req, res) => {
    try {
        // Query MongoDB to retrieve all specified fields
        const FullPC = await pcConfig.find({}, 'email username cpu gpu ram hdd ssd');

        // Debugging: Log the retrieved PC configurations
        console.log("Retrieved PC Configurations:", FullPC);

        // Return the retrieved PC configurations
        return res.json(FullPC);
    } catch (error) {
        console.error("Error fetching PC configuration:", error);
        return res.status(500).json({ error: "Error fetching PC configuration." });
    }
});

module.exports = router;
