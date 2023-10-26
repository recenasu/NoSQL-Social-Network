const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // GET all users
async getUsers(req, res) {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
},
    
    // GET a single user by its _id and populated thought and friend data
    
    
    // POST a new user
    
    
    // PUT to update a user by its _id
    
    
    // DELETE to remove a user by its _id
    
    
    // BONUS: Remove a user's associated thoughts when deleted.

    // Other routes
    // POST to add a new freiend to a user's friend list

    // DELETE to remove a friend from a user's friend list
};