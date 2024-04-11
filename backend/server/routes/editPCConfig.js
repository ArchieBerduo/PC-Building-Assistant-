const express = require('express');
const router = express.Router();
const UserPC = require('../models/userPc'); // Ensure this path correctly points to your UserPC model

router.post('/', async (req, res) => {
  const { username, email, new_model, componentType, selectedConfiguration } = req.body;

  console.log("Received data:", { username, email, new_model, componentType, selectedConfiguration });

  if (!username || !email || !new_model || !componentType || !selectedConfiguration) {
    console.error("Missing required fields");
    return res.status(400).send({ message: 'Missing required fields' });
  }

  try {
    const query = { username, email, ...selectedConfiguration };
    console.log("Query for MongoDB:", query);

    const userPC = await UserPC.findOne(query);
    if (!userPC) {
      console.error("No matching configuration found:", query);
      return res.status(404).send({ message: 'Matching PC configuration not found' });
    }

    if (!(componentType in userPC)) {
      console.error("Invalid component type:", componentType);
      return res.status(400).send({ message: `Component type '${componentType}' does not exist in the configuration` });
    }

    userPC[componentType] = new_model;
    await userPC.save();

    console.log("Configuration updated successfully");
    res.status(200).send({ message: 'PC configuration updated successfully' });
  } catch (error) {
    console.error('Failed to update PC configuration:', error);
    res.status(500).send({ message: 'Internal server error', error: error.message });
  }
});


module.exports = router;