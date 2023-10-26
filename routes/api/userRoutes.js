const router = require('express').Router();
const {
    // insert routes here
    getUsers
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers);

module.exports = router;