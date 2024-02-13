const mongoose = require("mongoose");

const hddSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    label: "Type", // HDD or SSD, if applicable
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
  storageSize: {
    type: String,
    required: true,
    label: "Storage Size", // E.g., "1TB"
  },
  modelName: {
    type: String,
    required: true,
    label: "Model Name",
  },
  year: {
    type: Number,
    required: true,
    label: "Year",
  },
}, {
  collection: "hdds" // Specifying the collection name in the database
});

module.exports = mongoose.model('HDD', hddSchema);
