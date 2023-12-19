// This component handles displaying the workouts associated with the logged-in user on the profile page

import {useState, useEffect} from "react"
import { useAppCtx } from "../utils/AppProvider";

function WorkoutPage(){

  const {user} = useAppCtx();


  const[workouts, setWorkouts] = useState([]);


  async function getWorkouts(){
  
  fetch (`/api/users/${user._id}/workouts`, {
    headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(data =>{
      setWorkouts(data.payload)
    })
  }

  useEffect(()=>{
    getWorkouts()
  }, [user._id])

  if(workouts.length===0) return <h4>Waiting for workout data...</h4>
  return(
    <div className="d-flex justify-content-evenly flex-wrap">
      <h2>Workouts:</h2>
      {
        workouts.map(workout =>{
          return(
            <div>
              <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                  <h5 className="card-title">Description: {workout.exerciseType}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">Calories Burned: {workout.caloriesBurnt}</h6>
                  <p className="card-text">After Workout Weight: {workout.afterWorkoutWeight}</p>
           
                </div>
              </div>

             </div> 
          )
        })
      }
    </div>
  )
}

export default WorkoutPage