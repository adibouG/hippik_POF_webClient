import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import UserCard from '../UserCard/UserCard';
import type { User } from '../../Types/@types.user';

interface Props {
  user?: User | null;
}

function UserMenu({user}: Props) {
  const isLogged = user ? true : false;
  return (
      
      <DropdownButton style={{zIndex: 1030}} id="dropdown-basic-button" title="Dropdown button">
        
        <UserCard user={user}></UserCard>

        {
          (isLogged) ? 
              <>
                <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
                <Dropdown.Item href="#/action-2">LogOut</Dropdown.Item>
              </>
              :
              <>
                <Dropdown.Item href="#/action-3">Log In</Dropdown.Item>
                <Dropdown.Item href="#/action-4">Register</Dropdown.Item>
              </>
        }
      </DropdownButton>
  );
}



export default UserMenu;