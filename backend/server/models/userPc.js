const mongoose = require("mongoose");

//user schema/model
const pcConfig = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
    },
    email: {
      type: String,
      required: true,
      label: "email",
    },
    CPU: {
      type: String
    },
   
    GPU: {
        type: String
      },
    MotherBoard: {
        type: String
      },
    RAM: {
        type: String
      },
    HDD: {
        type: String
      },
    SSD: {
        type: String
      },
    PSU : {
        type: String
        
      },
      
  },
  { collection: "User PC configuration" }
);

module.exports = mongoose.model("User PC configuration", pcConfig)