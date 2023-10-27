// Seed data execution, if necessary.

const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userArray } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // drop existing users
    await User.deleteMany({});

    // drop existing thoughts
    await Thought.deleteMany({});
 

const seedUsers = async () => {
    try {
        
    // Create User collection
    await User.insertMany(userArray);
    console.log("made it here")
    
} catch (err) {
    console.error(err)
}
}

seedUsers();

});