const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userSeed, emailSeed, thoughtSeed, userArray } = require('./data');
const getRandomInt = require('../helpers/getRandomInt.js');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // drop existing users
    await User.deleteMany({});

    // drop existing thoughts
    await Thought.deleteMany({});
 

const seedUsers = async () => {
    try {
    // const users = [];
    
    // // Loop 10 times, add users to array
    // for (let i = 0; i < 10; i++) {
        
    //     // Add users and emails to users array
    //     const username = userSeed[i];
    //     const email = emailSeed[i];
        
    //     users.push({
    //         username,
    //         email,
    //     });
        
    //     console.log(`${username} added!`);
    // }
    
    // Create User collection
    await User.insertMany(userArray);
    console.log("made it here")
    
} catch (err) {
    console.error(err)
}
}

// const seedThoughts = async () => {
//     try {
//     const thoughts = [];
    
//     // Loop 10 times, add thoughts to array
//     for (let i = 0; i < 10; i++) {
        
//         // Iterate through the thoughtSeed and userSeed arrays
//         const thoughtText = thoughtSeed[i];
//         const username = userSeed[i];
        
//         // Find the corresponding user document
//         const user = await User.findOne({ username });

//         // Create a new thought document and assign it to the user
//         thoughts.push({
//             thoughtText,
//             username: user._id,
//         });
        
//         console.log(`${thoughtText} added!`);
//     }
    
//     // Create User collection
//     await Thought.insertMany(thoughts);
    
// } catch (err) {
//     console.error(err)
// }
// }

seedUsers();
// seedThoughts();

});