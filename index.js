// Import express, the db connection, and the defined routes. 
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// assign the current working directory to a variable
const cwd = process.cwd();

// Set the PORT variable and start an instance of express
const PORT = process.env.PORT || 3001;
const app = express();

// Use express middleware to parse urlencoded and json data, and use the routes object.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Wait for the db connection, then start express listening on the PORT.
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server for ${cwd} running on port ${PORT}!`);
    });
});