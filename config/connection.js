// Import objects from the mongoose package.
const { connect, connection } = require('mongoose');

// Assign connection parameters that will be used to connect to the database to a variable.
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetworkDB';

// Connect to the database.
connect(connectionString);

// Export the database connection object.
module.exports = connection;