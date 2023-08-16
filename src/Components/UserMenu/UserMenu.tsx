
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import UserCard from '../UserCard/UserCard';
import type { User } from '../Types/@types.user';
import { NavbarBrand } from 'react-bootstrap';

interface Props {
  user?: User | null;
  children?: React.ReactNode ;
}

function UserMenu({ user }: Props) {
  const isLogged = user ? true : false;
  return (
  
    <Container style={{margin: 0, width: 'auto',display: 'flex',justifyContent: 'space-between', alignItems: 'center'}} >
      <Navbar style={{padding: 0,height: '100%',border: '1px solid gray', borderRadius: '10px'}}>
        <Navbar.Brand style={{height: '100%',margin: 0, padding: 0}}> <UserCard user={user} /></Navbar.Brand>
        <Navbar.Toggle></Navbar.Toggle>
        <Navbar.Collapse>
        <Nav>
  
        <NavDropdown drop="down-centered" style={{zIndex: 1030}} id="dropdown-basic-button" title="">
        {
          (user) ? 
          <>
              <NavDropdown.Item href="#/action-1">Edit</NavDropdown.Item>
              <NavDropdown.Item href="#/action-2">LogOut</NavDropdown.Item>
              </>
              :
              <>
                <NavDropdown.Item href="#/action-3">Log In</NavDropdown.Item>
                <NavDropdown.Item href="#/action-4">Register</NavDropdown.Item>
                </>
              }
            </NavDropdown> 
              </Nav>
          </Navbar.Collapse>
      </Navbar>
  </Container>
 
       
  );
}



export default UserMenu;