const router = require('express').Router();

const userRoutes = require('./user.routes');
const goalRoutes = require('./goal.routes');
const workoutRoutes = require('./workout.routes');

router.use('/users', userRoutes);
router.use('/goals', goalRoutes);
router.use('/workouts', workoutRoutes);

module.exports = router;
