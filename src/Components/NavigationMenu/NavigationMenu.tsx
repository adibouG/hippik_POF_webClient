import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

function NavigationMenu() {
  let expand = 'lg';
  return (
    <>
      
        <Navbar expand={expand} className="bg-body-tertiary fixed-top">
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Dashboard</Nav.Link>
                  <Nav.Link href="#action2">Contests</Nav.Link>
                  <Nav.Link href="#action3">Participants</Nav.Link>
                  <Nav.Link href="#action4">Statistics</Nav.Link>
                  <Nav.Link href="#action5">Chats</Nav.Link>
                  <Nav.Link href="#action6">Users</Nav.Link>
                  <Nav.Link href="#action7">Settings</Nav.Link>
                </Nav>
               
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      
    </>
  );
}

export default NavigationMenu;