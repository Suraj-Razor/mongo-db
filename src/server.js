const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

app.use(express.json());

app.get("/", (request, response, next) => {
    response.json({
        message: "Hello World"
    });
});

const ContactRouter = require("./controllers/ContactRouter");
app.use("/contacts", ContactRouter);

// Return a bunch of useful details from the database connection
// Dig into each property here:
// https://mongoosejs.com/docs/api/connection.html
app.get("/databaseHealth", (request, response) => {
    // return next();
    let databaseState = mongoose.connection.readyState;
    let databaseName = mongoose.connection.name;
    let databaseModels = mongoose.connection.modelNames();
    let databaseHost = mongoose.connection.host;

    response.json({
        readyState: databaseState,
        dbName: databaseName,
        dbModels: databaseModels,
        dbHost: databaseHost
    });
});

app.get("*", (request, response) => {
    response.json({ message: "404 route mode activated" });
});

app.use((error, request, response, next) => {
    response.status(500).json({
        message: "Error occured in the server",
        error: error.message
    });
});
module.exports = { app };
