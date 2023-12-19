// This component is responsible for rendering all the goals associated with the logged-in user, visible on the profile page

import { useState, useEffect } from "react"
import { useAppCtx } from "../utils/AppProvider";


export default function GoalDisplay() {

  const {user} = useAppCtx();

  const [goalData, setGoalData] = useState([]);

  async function getGoals(){

    try {
      const query = await fetch(`api/users/${user?._id}/goals`)
      const response = await query.json()
      if( response.result === "success" ){
        setGoalData(response.payload)
      }
    } catch(err){
      console.log(err.message)
    }
  }
  
  useEffect(() => {
    getGoals()
  },[user._id])

  if( !user?._id) return <></>
  if(goalData.length===0) return <h4>Waiting for goal data...</h4>
  return(
    <div className="d-flex justify-content-evenly flex-wrap">
      <h2>Goals:</h2>
      {
        goalData.map(goal =>{
          return(
            <div>
              <div className='card' style={{ width: '18rem' }}>
                <div className='list-group' variant="flush">
                  <div className='list-group-item' key="goal.weightLoss">Weight Loss Goal: {goal.weightLoss}</div>
                  <div className='list-group-item' key="goal.weightGain">Weight Gain Goal: {goal.weightGain}</div>
                  <div className='list-group-item' key="goal.bmi">BMI Goal: {goal.bmi.$numberDecimal}</div>
                  <div className='list-group-item' key="goal.totalCalorieGoal">Total Calorie Goal: {goal.totalCalorieGoal}</div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}