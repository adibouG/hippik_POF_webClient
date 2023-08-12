import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import UserCard from '../UserCard/UserCard';





function UserMenu() {
  const isLogged = true;
    return (
      <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        
        <UserCard children={null}/>

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