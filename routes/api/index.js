const router = require('express').Router();
const userRoutes = require('./api/reactionRoutes');
const thoughtRoutes = require('./api/thoughtRoutes');
// const reactionRoute = require('./api/reactionRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);



module.exports = router;