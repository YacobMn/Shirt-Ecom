// This file handles the functions necessary for our user routes; of particular note is our functions that grab all the goals and workouts of a particular user

const { User, Workout, Goal } = require('../models');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();

const Model = User; 

  async function verifyUser(req){
    const cookie = req.cookies["auth-cookie"]
    if( !cookie ) return false 

    const isVerified = jwt.verify(cookie, process.env.JWT_SECRET)
    if( !isVerified ) return false 

    const user = await Model.findOne({ _id: isVerified.id })
    if( !user ) return false 

    return user
}


async function authenticate(data){
  let user 

  try {
    user = await Model.findOne({ email: data.email })
  } catch(err) {
    console.log(err)
    throw new Error(err)
  }

  if(!user) throw new Error("No user found")

  let userIsOk = false
  try {
    userIsOk = await bcrypt.compare( data.password, user.password )
  } catch(err){
    console.log(err)
    throw new Error(err)
  }

  if(!userIsOk) throw new Error("Could not login")
  return user;
}


async function getAllItems() {
  try {
    return await Model.find();
  } catch (err) {
    throw new Error(err)
  }
}

async function getItemById(id) {
  try {
    return await Model.findById(id);
  } catch (err) {
    throw new Error(err)
  }
}

// use this as our signup handler
async function createItem(data) {
  try {
    return await Model.create(data);
  } catch (err) {
    throw new Error(err)
  }
}

async function updateItemById(id, data) {
  try {
    return await Model.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  } catch (err) {
    throw new Error(err)
  }
}

async function deleteItemById(id) {
  try {
    return await Model.findByIdAndDelete(id);
  } catch (err) {
    throw new Error(err)
  }
}

async function getAllWorkouts(id) {
  try {
    return await Workout.find().where('userID').in(id);
  } catch (err) {
    throw new Error(err)
  }
}
async function getAllGoals(id) {
  try {
    return await Goal.find().where('userID').in(id);
  } catch (err) {
    throw new Error(err)
  }
}
module.exports = {
  getAllGoals: getAllGoals,
  getAllUsers: getAllItems,
  getUserById: getItemById,
  createUser: createItem,
  updateUserById: updateItemById,
  deleteUserById: deleteItemById,
  getAllWorkouts,
  authenticate,
  verifyUser
}
