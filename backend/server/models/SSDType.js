const mongoose = require("mongoose");

const ssdSchema = new mongoose.Schema({
  Type: {
    type: String,
    required: false,
    label: "Type", // Could be "SSD" for all entries if this dataset exclusively contains SSDs
  },
  Brand: {
    type: String,
    required: false,
    label: "Brand",
  },
  Model: {
    type: String,
    required: false,
    label: "Model",
  },
  Size: {
    type: String,
    required: false,
    label: "Size", // E.g., "256GB", "1TB"
  },
  Model_Type: {
    type: String,
    required: false,
    label: "Model_Type", // E.g., "NVMe", "SATA"
  },
}, {
  collection: "SSD" // Specifying the collection name in the database
});

module.exports = mongoose.model('SSD', ssdSchema);
