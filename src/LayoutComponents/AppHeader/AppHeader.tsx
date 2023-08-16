import { useContext } from 'react';
import Stack from 'react-bootstrap/Stack';
import NavigationMenu from '../../Components/NavigationMenu/NavigationMenu';
import UserMenu from '../../Components/UserMenu/UserMenu';
import { UserContext } from '../../Components/ContextStore/UserContext';

import type { UserContextType } from '../../Components/ContextStore/UserContext';
import type { User } from '../../Components/Types/@types.user';
import './AppHeader.css';

function AppHeader() {

  const userData: UserContextType  | null = useContext(UserContext);
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
