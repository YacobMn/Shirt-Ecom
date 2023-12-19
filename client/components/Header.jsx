// This component is the header that shows up across all pages, with conditional logic determining which tabs the user has access to (depending on whether they are logged-in or not)

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAppCtx } from "../utils/AppProvider"

export default function Header() {
  const { user } = useAppCtx()

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Fitness Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            { user?._id !== undefined && (
              <Nav.Link href="/profile">Profile</Nav.Link>
            )}

            { user?._id !== undefined && (
              <Nav.Link href="/calc">BMI Calc</Nav.Link>
            )}

            { user?._id !== undefined && (
              <Nav.Link href="/workoutform">Add a Workout</Nav.Link>
            )}

            { user?._id !== undefined && (
              <Nav.Link href="/goalform">Add a Goal</Nav.Link>
            )}

            { user?._id !== undefined ? (
              <Nav.Link href="/logout">Logout</Nav.Link>
            ):(
              <Nav.Link href="/auth">Login</Nav.Link>
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
