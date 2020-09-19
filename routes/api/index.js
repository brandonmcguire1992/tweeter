const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// /users and /thoughts
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;