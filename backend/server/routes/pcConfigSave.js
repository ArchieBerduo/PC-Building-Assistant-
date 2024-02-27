const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const userPC = require('../models/userPc');

// Ensure you have a valid MongoDB URI
const mongoURI = 'mongodb+srv://Archie:W33zz33r..@cluster0.6kqyush.mongodb.net/';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

router.post('/saveComponents', async (req, res) => {
  console.log("Received payload for saving:", req.body); // Log the received payload
  try {
      // Manually assign values to ensure correct mapping
      const newPcConfig = new userPC({
          cpu: req.body.cpu,
          gpu: req.body.gpu,
          ssd: req.body.ssd,
          hdd: req.body.hdd,
          ram: req.body.ram,
          email: req.body.email,
          username: req.body.username,
      });

      console.log("New PC Config object to save:", newPcConfig); // Log the document to be saved

      await newPcConfig.save();
      console.log("Components saved successfully!"); // Confirm saving success
      res.status(201).send({ message: 'Components saved successfully!' });
  } catch (error) {
      console.error('Failed to save components:', error);
      if (error.errors) {
          console.error('Validation errors:', error.errors); // Log validation errors if any
      }
      res.status(400).send({ error: 'Failed to save components', details: error.message });
  }
});

module.exports = router;