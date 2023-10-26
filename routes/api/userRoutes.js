const router = require('express').Router();
const {
    // insert routes here
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');
const { add } = require('../../models/Reaction');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/friend/:userId
router.route('/:userId/friends').put(addFriend);

// /api/users/friend/:userId/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;