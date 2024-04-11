const express = require('express');
const router = express.Router();
const UserPC = require('../models/userPc'); // Ensure this path correctly points to your UserPC model

router.post('/editPCConfig', async (req, res) => {
  const { username, email, new_model, componentType, selectedConfiguration } = req.body;

  // Validate input data
  if (!username || !email || !new_model || !componentType || !selectedConfiguration) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  try {
    // Construct query to find the exact matching configuration
    const query = { username, email, ...selectedConfiguration };

    const userPC = await UserPC.findOne(query);
    if (!userPC) {
      return res.status(404).send({ message: 'Matching PC configuration not found' });
    }

    // Ensure the componentType is valid and exists in the user's configuration
    if (!(componentType in userPC)) {
      return res.status(400).send({ message: `Component type '${componentType}' does not exist in the configuration` });
    }

    // Update the specific component
    userPC[componentType] = new_model;
    await userPC.save();

    res.status(200).send({ message: 'PC configuration updated successfully' });
  } catch (error) {
    console.error('Failed to update PC configuration:', error);
    res.status(500).send({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;