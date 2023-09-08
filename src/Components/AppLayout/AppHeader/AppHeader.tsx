import { useContext } from 'react';
import Stack from 'react-bootstrap/Stack';
import NavigationMenu from '../../NavigationMenu/NavigationMenu';
import UserMenu from '../../UserMenu/UserMenu';
import Search from '../../Search/Search';
import * as SearchContext from '../../../ContextStore/SearchContext';
import * as UserContext from '../../../ContextStore/UserContext';
import type { User } from '../../../Types/@types.user';
import './AppHeader.css';

function AppHeader() {

  const userData: UserContext.UserContextType  | null = useContext(UserContext.UserContext);
  const searchTextData: SearchContext.SearchContextType | undefined = useContext(SearchContext.SearchContext);
  const user: User | null = userData?.user || null ;


  return (
  
      <Stack direction="horizontal" as="header" className="App-header">
        <NavigationMenu user={user}  />
        <Search searchContext={searchTextData}/>   
        <UserMenu user={user} cbFunc={userData?.userLogOut} />
      </Stack>

    );
}

export default AppHeader;
