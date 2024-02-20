const mongoose = require("mongoose");

const cpuSchema = new mongoose.Schema({
  Type: {
    type: String,
    required: true,
    label: "Type",
  },
  Brand: {
    type: String,
    required: true,
    label: "Brand",
  },
  Model: {
    type: String,
    required: true,
    label: "Model",
  },
  Model_Type: {
    type: String,
    required: true,
    default: 'N/A' // Default value if none is provided
  },
  Tier: {
    type: String,
    required: false,
    label: "Tier",
  },
  Processor_Number: {
    type: String,
    required: false,
    label: "Processor_Number",
  },
}, {
  collection: "CPU" // Specifying the collection name in the database
});

module.exports = mongoose.model('CPU', cpuSchema);