const { User, Thought } = require('../models');

module.exports = {
    // GET to get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            return res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    
    // GET to get a single thought by its _id


    // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)


    // PUT to update a thought by its _id



    // DELETE to remove a thought by its _id


    // Other routes
    // POST to create a reaction stored in a single thought's reactions array field

    // DELETE to pull and remove a reaction by the reaction's reactionId value
}