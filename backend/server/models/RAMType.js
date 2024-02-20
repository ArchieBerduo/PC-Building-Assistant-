const mongoose = require("mongoose");

const ramSchema = new mongoose.Schema({
  Type: {
    type: String,
    required: true,
    label: "Type", // E.g., DDR4, DDR3
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
  Type_Speed: {
    type: String,
    required: true,
    label: "Type_Speed", // E.g., "3200MHz"
  },
  CAS_Latency: {
    type: String,
    required: true,
    label: "CAS_Latency", // E.g., "CL16"
  },
  RAM_Sticks: {
    type: Number,
    required: true,
    label: "RAM_Sticks", // E.g., 2 for a dual kit
  },
  GB_Amount: {
    type: String,
    required: true,
    label: "GB_Amount", // E.g., "16GB"
  },
}, {
  collection: "RAM" // Specifying the collection name in the database
});

module.exports = mongoose.model('RAM', ramSchema);
