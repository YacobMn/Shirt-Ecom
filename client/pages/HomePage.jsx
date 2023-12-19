// This component handles the rendering on the homepage, with conditional logic dictating what logged-in users see versus what a non-logged-in user sees

import { Container, Row, Col } from 'react-bootstrap';
import { useAppCtx } from "../utils/AppProvider";
import "bootstrap/dist/css/bootstrap.css";
import fitnesstracker from '../img/fitnesstracker.png';
export default function HomePage() {

  const { user } = useAppCtx();

  if( !user?._id ){
    return (
      <>
      <Container fluid className="d-flex align-items-center vh-30">
      <Row className="w-75 justify-content-center">
        <Col xs={12} sm={6} md={4}>
      <div><img src={fitnesstracker}/></div>
      </Col>
      </Row>
      </Container>
        <h1 className="text-center">Hello there, person!</h1>
        <p className="text-center">Welcome to our application, the Fitness Tracker! First and foremost, if you are a returning user, feel free to click that friendly "Login" button at the top left corner there, and go about your business! If you're someone new, I'll let you know a little bit about what we have going on in this neat little thing. Really, the goal of this application is to help keep you going in terms of motivation to workout and further improve yourself physically as your fitness journey progresses. Our application helps track height, weight, BMI, the workouts that you've done, and how far along you are in your goals that YOU make! </p>
      </>
    )
  } 
  return (
    <>
    <Container fluid className="d-flex align-items-center vh-30">
      <Row className="w-75 justify-content-center">
        <Col xs={12} sm={6} md={4}>
      <div><img src={fitnesstracker}/></div>
      </Col>
      </Row>
      </Container>
      <h1 className="text-center">Welcome back, {user.firstname}!</h1>
    </>
  )
}