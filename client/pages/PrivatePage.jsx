// This page handles the profile tab of the site, rendering out the LineChart, GoalDisplay, and WorkoutDisplay components

import { useEffect, useState } from "react"
import { useAppCtx } from "../utils/AppProvider";
import LineChartDisplay from '../components/LineChart'
import GoalDisplay from "../components/GoalDisplay";
import WorkoutDisplay from "../components/WorkoutDisplay";
import {Container, Row, Col} from "react-bootstrap";



export default function PrivatePage(){

  const {user} = useAppCtx();
  
  const [graphDisplay, setGraphDisplay] = useState([])

  async function getWorkouts(){

    try {
      const query = await fetch(`api/users/${user?._id}/workouts`)
      const response = await query.json()
      if( response.result === "success" ){
        setGraphDisplay(response.payload)
      }
    } catch(err){
      console.log(err.message)
    }
  }

  useEffect(() => {
    getWorkouts()
  },[user._id])



  if( !user?._id) return <></>
  return (
    <>
      <h1>Weight Chart</h1>
      <LineChartDisplay graph={graphDisplay}/>
      <Container fluid className="d-flex align-items-center">
        <Row className="justify-content-evenly">
          <Col xs={6}>
            <GoalDisplay />
          </Col>
        </Row>
        <Row className="justify-content-evenly">
          <Col xs={6}>
            <WorkoutDisplay />
          </Col>
        </Row>
      </Container>
    </>
  )
}