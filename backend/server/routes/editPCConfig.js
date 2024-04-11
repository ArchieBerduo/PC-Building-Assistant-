const express = require('express');
const router = express.Router();
const UserPC = require('../models/userPc'); // Assuming this is your model for PC configurations

router.post('/editPCConfig', async (req, res) => {
  const { username, email, new_model, componentType } = req.body;

  try {
    const userPC = await UserPC.findOne({ username, email });
    if (!userPC) {
      return res.status(404).send({ message: 'User PC configuration not found' });
    }

    // Update the specific component based on componentType
    userPC[componentType.toLowerCase()] = new_model;

    await userPC.save();
    res.status(200).send({ message: 'PC configuration updated successfully' });
  } catch (error) {
    console.error('Failed to update PC configuration:', error);
    res.status(500).send({ message: 'Failed to update PC configuration', error: error.message });
  }
});

module.exports = router;
