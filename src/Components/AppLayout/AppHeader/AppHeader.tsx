import { useContext } from 'react';
import Stack from 'react-bootstrap/Stack';
import NavigationMenu from '../../NavigationMenu/NavigationMenu';
import UserMenu from '../../UserMenu/UserMenu';
import * as UserContext from '../../../ContextStore/UserContext';
import type { User } from '../../../Types/@types.user';
import './AppHeader.css';

function AppHeader() {

  const userData: UserContext.UserContextType  | null = useContext(UserContext.UserContext);
  const user: User | null = userData?.user || null ;

  return (
  
      <Stack direction="horizontal" as="header" className="App-header">
        <NavigationMenu />
        <div className="searchcontainer"></div>   
        <UserMenu user={user} />
      </Stack>

    );
}

export default AppHeader;
