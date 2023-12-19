// A simple bmi calculator component, pretty much a form that renders out a useState variable on form submit

import { useState, useEffect } from "react"
import { useAppCtx } from "../utils/AppProvider";

export default function GoalForm() {

  const {user} = useAppCtx();

  const [bmi, setBMI] = useState({height: 0, weight: 0})
  const [display, setDisplay] = useState('')

  // will need to add validators at some point (unless MVP gets dicey)
  async function createGoal(event){
    
    event.preventDefault()
    const newDisplay = await solveIt()
    setDisplay(newDisplay)
    
  }

  function handleInputChange(event){
    setBMI({...bmi, [event.target.name]: event.target.value})
  }

  async function solveIt(){
    const calced = (720*bmi.weight)/(bmi.height*bmi.height)
    return calced.toString()
  }

  useEffect(() => {

  },[user._id])

  if( !user?._id ) return <></>
  return(
    <>
    <form onSubmit={createGoal}>
        <label>Current Weight?: </label>
        <input type='number' name='weight' value={bmi.weight} onChange={handleInputChange}/>
        <div></div>
        <label>Current Height?: </label>
        <input type='number' name='height' value={bmi.height} onChange={handleInputChange}/>
        <div></div>
        <button>Confirm</button>
    </form>
    <div className="d-flex mt-10">
      <p>Your BMI is: {display ? (display) : ("waiting for input")}</p>
    </div>
    </>
  )
}