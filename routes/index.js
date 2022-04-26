const app = require('express').Router();
const userRoute = require('./api/reactionRoutes');
const thoughtRoute = require('./api/thoughtRoutes');
// const reactionRoute = require('./api/reactionRoutes');

app.use('/users', userRoute);
app.use('/thoughts', thoughtRoute);



module.exports = app;

