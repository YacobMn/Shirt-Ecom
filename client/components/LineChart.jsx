// This component is responsible for displaying the recharts package graph on the profile page. Conditional logic is used in the return statement to prevent it from rendering a blank graph if the user has no workout information.

// Future time outside of the cohort will be spent improving this aspect of the website

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useAppCtx } from "../utils/AppProvider";
import { useEffect, useState} from "react"

export default function LineChartDisplay(props) {

  const {user} = useAppCtx();

  const [data, setData] = useState([]);
  let dataHolder = []


  async function fixData() {
    for(let x=0; x<props.graph.length; x++){
      const input = {name: `Workout ${x+1}`, weight: props.graph[x].afterWorkoutWeight, pv: 2400, amt: 2400}

      dataHolder.push(input)
    }
    setData(dataHolder)
  }

  async function renderData(){
    if (props.graph.length !== 0){

      await fixData()

    }
  }
  
  useEffect(() => {

    renderData()
  },[props])


  if( !props?.graph ) return <><p>waiting for info...</p></>
  if( data.length===0 ){
    return (
    <>
      <div className='d-flex mb-5 mt-5'>
        <h2>Waiting for weight data before displaying graph...</h2>
      </div>
    </>
    )
  } 
  return (
  <LineChart width={600} height={300} data={data}>
    <Line type="monotone" dataKey="weight" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
  </LineChart>
  )
};