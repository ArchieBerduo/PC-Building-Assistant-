const mongoose = require("mongoose");

const gpuSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    label: "Type", // GPU type
  },
  brand: {
    type: String,
    required: true,
    label: "Brand", // Manufacturer
  },
  modelName: {
    type: String,
    required: true,
    label: "Brand", // Manufacturer
  },
  modelType: {
    type: String,
    required: true,
    label: "Model Type", // Specific model
  },
  memory: {
    type: String,
    required: true,
    label: "VRAM Memory", // Memory size and type
  },
  modelTier: {
    type: String,
    required: true,
    label: "GPU Model tier", // Memory size and type
  }

  // Assuming you have other relevant specifications you'd like to include
  // but excluding Benchmark and URL as per your request
}, {
  collection: "gpus" // Specifying the collection name in the database
});

module.exports = mongoose.model('GPU', gpuSchema);