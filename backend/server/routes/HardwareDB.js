const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const fs = require('fs');
const csv = require('csv-parser');
const CPUType = require('../models/CPUType');
const GPUType = require('../models/GPUType');
const RAMType = require('../models/RAMType');
const HDDType = require('../models/HDDType');
const SSDType = require('../models/SSDType');

const mongoURI = 'mongodb+srv://Archie:W33zz33r..@cluster0.6kqyush.mongodb.net/';

//Corrected file paths and model mapping
const fileModelMap = [
 { filePath: "./datasets/cleaned_CPU_UB.csv", Model: CPUType },
 { filePath: "./datasets/cleaned_GPU_UB.csv", Model: GPUType },
 { filePath: "./datasets/cleaned_HDD_UB.csv", Model: HDDType },
 { filePath: "./datasets/cleaned_RAM_UB.csv", Model: RAMType },
 { filePath: "./datasets/cleaned_SSD_UB.csv", Model: SSDType },
];

// Define a mapping for each model type
const mappings = {
 CPU: { Type: 'Type', Brand: 'Brand', Model: 'Model', Model_Type: 'Model_Type', Tier: 'Tier', Processor_Number: 'Processor_Number' },
  GPU: { Type: 'Type', Brand: 'Brand', Model: 'Model', GPU_Model: 'GPU_Model', VRAM_Size: 'VRAM_Size', GPU_Model_Type: 'GPU_Model_Type' },
  HDD: { Type: 'Type', Brand: 'Brand', Model: 'Model', Model_Name: 'Model_Name', Storage_Size: 'Storage_Size', Year: 'Year' },
  SSD: { Type: 'Type', Brand: 'Brand', Model: 'Model', Size: 'Size', Model_Type: 'Model_Type' },
  RAM: { Type: 'Type', Brand: 'Brand', Model: 'Model', Type_Speed: 'Type_Speed', CAS_Latency: 'CAS_Latency', RAM_Sticks: 'RAM_Sticks', GB_Amount: 'GB_Amount' }
};

const importCPUDataFromCsv = async (filePath, model) => {
  try {
    const stream = fs.createReadStream(filePath).pipe(csv());
    for await (const row of stream) {
      // Destructure only the fields that are present in the schema
      const { Type, Brand, Model, Model_Type, Tier, Processor_Number } = row;
      // Create a new object with only the fields from the schema
      const itemData = {
        Type: Type,
        Brand: Brand,
        Model: Model,
        Model_Type: Model_Type, // Note the change here to match your schema
        Tier: Tier,
        Processor_Number: Processor_Number,
      };
      try {
        const item = new model(itemData);
        await item.save();
        console.log('Item saved:', item);
      } catch (err) {
        console.error('Error saving item:', err);
      }
    }
    console.log(`${filePath} file successfully processed`);
  } catch (error) {
    console.error('Error processing file:', filePath, error);
  }
};

// Adjusted import function to use mappings

const importHDDDataFromCsv = async (filePath, model) => {
  try {
    const stream = fs.createReadStream(filePath).pipe(csv());
    for await (const row of stream) {
      // Adjust destructuring for HDD fields
      const { Type, Brand, Model, Model_Name, Storage_Size, Year } = row;
      // Create a new object with HDD fields from the schema
      const itemData = {
        Type,
        Brand,
        Model,
        Model_Name,
        Storage_Size,
        Year: Year || null, // Year is optional, provide null if not present
      };
      try {
        const item = new model(itemData);
        await item.save();
        console.log('Item saved:', item);
      } catch (err) {
        console.error('Error saving item:', err);
      }
    }
    console.log(`${filePath} file successfully processed`);
  } catch (error) {
    console.error('Error processing file:', filePath, error);
  }
};


const importGPUDataFromCsv = async (filePath, model) => {
  try {
    const stream = fs.createReadStream(filePath).pipe(csv());
    for await (const row of stream) {
      // Adjust destructuring for GPU fields
      const { Type, Brand, Model, GPU_Model, VRAM_Size, GPU_Model_Type } = row;
      // Create a new object with GPU fields from the schema
      const itemData = {
        Type,
        Brand,
        Model,
        GPU_Model,
        VRAM_Size,
        GPU_Model_Type,
      };
      try {
        const item = new model(itemData);
        await item.save();
        console.log('Item saved:', item);
      } catch (err) {
        console.error('Error saving item:', err);
      }
    }
    console.log(`${filePath} file successfully processed`);
  } catch (error) {
    console.error('Error processing file:', filePath, error);
  }
};


const importSSDDataFromCsv = async (filePath, model) => {
  try {
    const stream = fs.createReadStream(filePath).pipe(csv());
    for await (const row of stream) {
      // Adjust destructuring for SSD fields
      const { Type, Brand, Model, Size, Model_Type } = row;
      // Create a new object with SSD fields from the schema
      const itemData = {
        Type,
        Brand,
        Model,
        Size,
        Model_Type,
      };
      try {
        const item = new model(itemData);
        await item.save();
        console.log('Item saved:', item);
      } catch (err) {
        console.error('Error saving item:', err);
      }
    }
    console.log(`${filePath} file successfully processed`);
  } catch (error) {
    console.error('Error processing file:', filePath, error);
  }
}; 



const importRAMDataFromCsv = async (filePath, model) => {
  try {
    const stream = fs.createReadStream(filePath).pipe(csv());
    for await (const row of stream) {
      // Adjust destructuring for RAM fields
      const { Type, Brand, Model, Type_Speed, CAS_Latency, RAM_Sticks, GB_Amount } = row;
      // Create a new object with RAM fields from the schema
      const itemData = {
        Type,
        Brand,
        Model,
        Type_Speed,
        CAS_Latency,
        RAM_Sticks,
        GB_Amount,
      };
      try {
        const item = new model(itemData);
        await item.save();
        console.log('Item saved:', item);
      } catch (err) {
        console.error('Error saving item:', err);
      }
    }
    console.log(`${filePath} file successfully processed`);
  } catch (error) {
    console.error('Error processing file:', filePath, error);
  }
};






// Example of calling the function for a GPU type
// await importDataFromCsv('./path/to/gpu.csv', GPUType, 'GPU');


async function runImport() {
  await importCPUDataFromCsv('./datasets/cleaned_CPU_UB.csv', CPUType);
  await importGPUDataFromCsv('./datasets/cleaned_GPU_UB.csv', GPUType);
  await importSSDDataFromCsv('./datasets/cleaned_SSD_UB.csv', SSDType);
  await importHDDDataFromCsv('./datasets/cleaned_HDD_UB.csv', HDDType);
  await importRAMDataFromCsv('./datasets/cleaned_RAM_UB.csv', RAMType);

  console.log('All data imported successfully');
}


// Export the runImport function
module.exports = { runImport };