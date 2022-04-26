const router = require('express').Router();
const userRoutes = require('./api/reactionRoutes');
const thoughtRoutes = require('./api/thoughtRoutes');
// const reactionRoute = require('./api/reactionRoutes');

app.use('/users', userRoutes);
app.use('/thoughts', thoughtRoutes);



module.exports = router;