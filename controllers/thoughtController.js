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
    async getSingleThought(req, res) {
        try {
            // find the requested thought and exclude the document version field
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that id' });
            };

            res.status(200).json(thought)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { username: thought.username },
                { $addToSet: { thoughts: thought._id } },
                { runValidators: true, new: true }
            );

            res.status(200).json(`Thought ${thought._id} created for ${user.username}!`);
        } catch (err) {
            res.status(500).json(err);
        }
    },


    // PUT to update a thought by its _id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that id' });
            }

                res.status(200).json(`$Thought {thought._id} updated!`);
            } catch (err) {
                res.status(500).json(err);
            }

        },


    // DELETE to remove a thought by its _id
    async deleteThought(req, res) {
            try {
                const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
                const user = await User.findOneAndUpdate(
                    { username: thought.username },
                    { $pull: { thoughts: thought._id } },
                    { runValidators: true, new: true }
                );

                if (!thought) {
                    return res.status(404).json({ message: 'No thought with that id' });
                };

                res.status(200).json(`Thought ${thought._id} deleted and user ${user._id} updated!`);
            } catch (err) {
                res.status(500).json(err);
            }
        },

        // Other routes
        // POST to create a reaction stored in a single thought's reactions array field
        async addReaction(req, res) {
            try {
                const thought = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $addToSet: { reactions: req.body } },
                    { runValidators: true, new: true }
                );
    
                if (!thought) {
                    return res.status(404).json({ message: 'No thought with that id' });
                };
                res.status(200).json(`Reaction added to ${thought._id}!`);
            } catch (err) {
                res.status(500).json(err);
            }
        },
    

        // DELETE to pull and remove a reaction by the reaction's reactionId value
        async removeReaction(req, res) {
            try {
                const thought = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $pull: { reactions: { reactionId: req.params.reactionId } } },
                    { runValidators: true, new: true }
                );
    
                if (!thought) {
                    return res.status(404).json({ message: 'No thought with that id' });
                };
                res.status(200).json(`Reaction ${req.params.reactionId} removed from ${thought._id}!`);
            } catch (err) {
                res.status(500).json(err);
            }
        }
    }