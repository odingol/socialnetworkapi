const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
// const reactionRoute = require('./api/reactionRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);



module.exports = router;