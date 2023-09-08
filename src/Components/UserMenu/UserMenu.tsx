
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserCard from '../UserCard/UserCard';
import  { User } from '../../Types/@types.user';
import { useOnlineStatus } from '../../Utils/useOnlineStatus.js';
import Links from '../Links/Links';

interface Props {
  user?: User | null;
  cbFunc? : () => Promise <boolean>;
}

function UserMenu({ user, cbFunc }: Props) {

  const isLogged = user ? true : false;
  const isOnline = useOnlineStatus();
  
  const handleClick = (e) => { 

    if (cbFunc) return cbFunc ();
  }

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
                  <NavDropdown.Item><Links to="/users">Edit</Links></NavDropdown.Item>
                  <NavDropdown.Item><Links onClick={handleClick}>LogOut</Links></NavDropdown.Item>
                </>
              :
                <>
                  <NavDropdown.Item><Links to="/">Log In</Links></NavDropdown.Item>
                  <NavDropdown.Item><Links to="/Register">Register</Links></NavDropdown.Item>
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