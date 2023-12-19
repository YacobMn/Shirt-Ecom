// This model is used for our Workout data

const mongoose = require('mongoose');


const workoutSchema = new mongoose.Schema(
  {
    exerciseType: {
      type: String,
      required: true,
    },
    caloriesBurnt: {
      type: Number,
      required: true,
    },
    afterWorkoutWeight: {
      type: Number,
      required: true,
    },
    userID: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
)

const Workout = mongoose.model('workout', workoutSchema);

module.exports = Workout;