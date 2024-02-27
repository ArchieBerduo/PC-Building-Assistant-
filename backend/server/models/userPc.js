const mongoose = require("mongoose");

const pcConfig = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  cpu: String, // Changed to lowercase
  gpu: String, // Changed to lowercase
  ram: String, // Changed to lowercase
  hdd: String, // Changed to lowercase
  ssd: String, // Changed to lowercase
}, { 
  collection: "User PC configuration" 
});

module.exports = mongoose.model("User PC configuration", pcConfig);
