const mongoose = require("mongoose");

const gpuSchema = new mongoose.Schema({
  Type: {
    type: String,
    required: false,
    label: "Type", // GPU type
  },
  Brand: {
    type: String,
    required: false,
    label: "Brand", // Manufacturer
  },
  Model: {
    type: String,
    required: false,
    label: "Model",
  },
  GPU_Model: {
    type: String,
    required: false,
    label: "GPUModel", // Manufacturer
  },
  VRAM_Size: {
    type: String,
    required: false,
    default: 'Unknown',
    label: "VRAM_Size", // Memory size and type
  },
  GPU_Model_Type: {
    type: String,
    required: false,
    //default: 'Unknown',
    label: "GPU_Model_Type", // Memory size and type
  }

  // Assuming you have other relevant specifications you'd like to include
  // but excluding Benchmark and URL as per your request
}, {
  collection: "GPU" // Specifying the collection name in the database
});

module.exports = mongoose.model('GPU', gpuSchema);