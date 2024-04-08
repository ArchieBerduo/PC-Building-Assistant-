const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const loginRoute = require('./routes/userLogin');
const getAllUsersRoute = require('./routes/userGetAllUsers');
const registerRoute = require('./routes/userSignUp');
const getUserByIdRoute = require('./routes/userGetUserById');
const dbConnection = require('./config/db.config');
const editUser = require('./routes/userEditUser');
const deleteUser = require('./routes/userDeleteAll');
const hardwarePull = require('./routes/hardwarePull');
const pcConfigSave = require('./routes/pcConfigSave');
const recommendationRouter = require('./routes/RecommendationListener');
const pullRecommendations = require('./routes/pullRecommendations');


// Assuming HardwareDB.js exports a function named runImport for importing CSV data
const { runImport } = require('./routes/HardwareDB');

// Import the startListening function from RecommendationListener.js

mongoose.connect('mongodb+srv://Archie:W33zz33r..@cluster0.6kqyush.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

require('dotenv').config();
const SERVER_PORT = process.env.SERVER_PORT || 8081;

dbConnection();
app.use(cors({origin: '*'}));
app.use(express.json());
app.use('/user', loginRoute);
app.use('/user', registerRoute);
app.use('/user', getAllUsersRoute);
app.use('/user', getUserByIdRoute);
app.use('/user', editUser);
app.use('/user', deleteUser);
app.use('/user', pcConfigSave);

// Other app.use() calls
app.use('/user', hardwarePull);

app.use('/recommendations', recommendationRouter);

app.use('/pullRecommendations', pullRecommendations);


// Route to trigger hardware data import from CSV files
app.get('/import-hardware-data', async (req, res) => {
    try {
        await runImport();
        res.status(200).send({ message: "Hardware data import completed successfully." });
    } catch (error) {
        console.error("Import error:", error);
        res.status(500).send({ message: "Error during data import." });
    }
});


app.listen(SERVER_PORT, () => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
});