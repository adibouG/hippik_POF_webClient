
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserCard from '../UserCard/UserCard';
import type { User } from '../../Types/@types.user';
import { useOnlineStatus } from '../../Utils/useOnlineStatus.js';

interface Props {
  user?: User | null;
}

function UserMenu({ user }: Props) {

  const isLogged = user ? true : false;
  const isOnline = useOnlineStatus();

  return (
  
    <Container style={{margin: 0, width: 'auto',display: 'flex',justifyContent: 'space-between', alignItems: 'center'}} >
      <Navbar style={{padding: 0,height: '100%',border: '1px solid gray', borderRadius: '10px'}}>
        <Navbar.Brand style={{height: '100%',margin: 0, padding: 0}}> <UserCard user={user} onLine={isOnline} /></Navbar.Brand>
        <Navbar.Toggle></Navbar.Toggle>
        <Navbar.Collapse>
          <Nav>
    
          { isOnline &&
            <NavDropdown drop="down-centered" align="end" style={{zIndex: 1030}} id="dropdown-basic-button" title="">
            {         
              (isLogged) ? 
                <>
                  <NavDropdown.Item href="#/action-1">Edit</NavDropdown.Item>
                  <NavDropdown.Item href="#/action-2">LogOut</NavDropdown.Item>
                </>
              :
                <>
                  <NavDropdown.Item href="#/action-3">Log In</NavDropdown.Item>
                  <NavDropdown.Item href="/Register">Register</NavDropdown.Item>
                </>
            }
            </NavDropdown>
          } 
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  </Container>
 
       
  );
}



export default UserMenu;