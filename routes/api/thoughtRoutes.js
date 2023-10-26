const router = require('express').Router();
const {
    // insert routes here
    getThoughts
} = require('../../controllers/thoughtController');

// /api/users
router.route('/').get(getThoughts);

module.exports = router;