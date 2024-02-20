const mongoose = require("mongoose");

const hddSchema = new mongoose.Schema({
  Type: {
    type: String,
    required: false,
    label: "Type", // HDD or SSD, if applicable
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
  Model_Name: {
    type: String,
    required: false,
    label: "Model_Name",
  },
  Storage_Size: {
    type: String,
    required: false,
    label: "Storage_Size", // E.g., "1TB"
  },
  Year: {
    type: Number,
    required: false,
    label: "Year",
  },
}, {
  collection: "HDD" // Specifying the collection name in the database
});

module.exports = mongoose.model('HDD', hddSchema);
