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
    async getSingleUser(req, res) {
        try {
            // find the requested user and exclude the document version field
            const user = await User.findOne({ _id: req.params.userId }).select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that id' });
            };

            res.status(200).json(user)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // POST a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json(`${user} created!`);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // PUT to update a user by its _id
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            res.status(200).json(`User ${user._id} updated!`);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE to remove a user by its _id
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with that id' });
            };

            // BONUS: Remove a user's associated thoughts when deleted.
            await Thought.deleteMany({ _id: { $in: user.thoughts } })

            res.status(200).json(`User ${user._id} deleted!`);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Other routes
    // POST to add a new friend to a user's friend list
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with that id' });
            };
            res.status(200).json(`Friend ${req.body._id} added to ${user._id}!`);
        } catch (err) {
            res.status(500).json(err);
        }
    },


    // DELETE to remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with that id' });
            };
            res.status(200).json(`Friend ${req.params.friendId} removed from ${user._id}!`);
        } catch (err) {
            res.status(500).json(err);
        }
    }


};