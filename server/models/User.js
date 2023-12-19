// This model is used for our User data

const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  totalCalories: {
    type: Number,
    required: true,
    default: 0,
  },
  bmi: {
    type: mongoose.Decimal128,
    required: true,
  },
},{
  timestamps: true, 
  toJSON: {
    getters: true,
  }
},

);

userSchema.pre("save", async function(next){
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

const User = mongoose.model('user', userSchema);

module.exports = User;
