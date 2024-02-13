const mongoose = require("mongoose");

const ssdSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    label: "Type", // Could be "SSD" for all entries if this dataset exclusively contains SSDs
  },
  modelType: {
    type: String,
    required: true,
    label: "Model Type", // E.g., "NVMe", "SATA"
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
    label: "Storage Size", // E.g., "256GB", "1TB"
  },
}, {
  collection: "ssds" // Specifying the collection name in the database
});

module.exports = mongoose.model('SSD', ssdSchema);
