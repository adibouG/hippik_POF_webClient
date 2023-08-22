import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import type { User } from '../../Types/@types.user';
import { Link, NavLink } from 'react-router-dom';
import Links  from '../Links/Links';

interface Props {
  user?: User | null;
}

const style = {
  display: 'block',
  padding: 'var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x)',
  fontSize: 'var(--bs-nav-link-font-size)',
  fontWeight: 'var(--bs-nav-link-font-weight)',
  color: 'var(--bs-nav-link-color)',
  textDecoration: 'none',
  background: '0 0',
  border: '0',
  transition: 'color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out',
}

function NavigationMenu ({user}: Props) {
  let expand = 'false';
  return (
    <>
      
        <Navbar expand={expand} className="bg-body-tertiary">
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
                  <Links  to="/main">Dashboard</Links>
                  <Links  to="/contests">Contests</Links>
                  <Links to="/chats">Chats</Links>
                  <Links to="/participants">Participants</Links>
                  <Links to="/statistics">Statistics</Links>
                  <Links to="/users"> Users</Links>
                  <Links to="/settings">Settings</Links>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      
    </>
  );
}

export default NavigationMenu;