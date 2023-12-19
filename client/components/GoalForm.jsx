// This component handles the goal form tab, which takes in information and creates a new goal object, before re-routing the user back to profile

import { useState, useEffect } from "react"
import { useAppCtx } from "../utils/AppProvider";

export default function GoalForm() {

  const {user} = useAppCtx();

  const [newGoal, setNewGoal] = useState({weightLoss: 0, weightGain: 0, bmi: 0, totalCalorieGoal: 0, userID: ''})

  async function createGoal(event){
    event.preventDefault()

    try {
      const query = await fetch(`/api/goals`, {
        method: "POST",
        body: JSON.stringify(newGoal),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const response = await query.json()
      if( response.result === "success" ){
        window.location.href = "/profile"
      }
    } catch(err){
      console.log(err.message)
    }
  }

  function handleInputChange(event){
    setNewGoal({...newGoal, [event.target.name]: event.target.value})
  }

  useEffect(() => {
    const editGoal = {...newGoal, userID: user._id}
    setNewGoal(editGoal)
  },[user._id])

  if( !user?._id ) return <></>
  return(
    <>
    <form onSubmit={createGoal}>
        <label>Weight Loss?: </label>
        <input type='number' name='weightLoss' value={newGoal.weightLoss} onChange={handleInputChange}/>
        <div></div>
        <label>Weight Gain?: </label>
        <input type='number' name='weightGain' value={newGoal.weightGain} onChange={handleInputChange}/>
        <div></div>
        <label>BMI?: </label>
        <input type='number' name='bmi' value={newGoal.bmi} onChange={handleInputChange}/>
        <div></div>
        <label>Total Calories?: </label>
        <input type='number' name='totalCalorieGoal' value={newGoal.totalCalorieGoal} onChange={handleInputChange}/>
        <div></div>
        <button>Confirm</button>
    </form>
    </>
  )
}