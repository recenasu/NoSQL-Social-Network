const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userSeed, emailSeed, thoughtSeed } = require('./data');
const getRandomInt = require('../helpers/getRandomInt.js');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // drop existing users
    await User.deleteMany({});

    // drop existing thoughts
    await Thought.deleteMany({});
    
const users = [];

    // Loop 10 times, add users to array
    for (let i = 0; i < 10; i++) {

        // Add users and emails to users array
        const username = userSeed[i];
        const email = emailSeed[i];

        users.push({
            username,
            email,
        });

        console.log(`${username} added with ${friends}!`);

    }
    
    // Create User collection
    await User.collection.insertMany(users);

    const users = await User.find();

    //     // Create random friends
    //     const thoughtText = thoughtSeed[getRandomInt(0, thoughtSeed.length)]

    //     await Thought.collection.insertOne({
    //         thoughtText,
    //         username,
    //     });

});