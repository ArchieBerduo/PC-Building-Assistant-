const mongoose = require("mongoose");

const cpuSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    label: "Type",
  },
  brand: {
    type: String,
    required: true,
    label: "Brand",
  },
  model: {
    type: String,
    required: true,
    label: "Model",
  },
  modelType: {
    type: String,
    required: true,
    label: "Model Type",
  },
  tier: {
    type: String,
    required: true,
    label: "Tier",
  },
  processorNumber: {
    type: String,
    required: true,
    label: "Processor Number",
  },
}, {
  collection: "cpus" // Specifying the collection name in the database
});

module.exports = mongoose.model('CPU', cpuSchema);