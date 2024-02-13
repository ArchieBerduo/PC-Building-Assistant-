const mongoose = require("mongoose");

const ramSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    label: "Type", // E.g., DDR4, DDR3
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
  modelNumber: {
    type: String,
    required: true,
    label: "Model Number",
  },
  speed: {
    type: String,
    required: true,
    label: "Speed", // E.g., "3200MHz"
  },
  casLatency: {
    type: String,
    required: true,
    label: "CAS Latency", // E.g., "CL16"
  },
  ramSticks: {
    type: Number,
    required: true,
    label: "RAM Sticks", // E.g., 2 for a dual kit
  },
  gbAmount: {
    type: String,
    required: true,
    label: "GB Amount", // E.g., "16GB"
  },
}, {
  collection: "rams" // Specifying the collection name in the database
});

module.exports = mongoose.model('RAM', ramSchema);
