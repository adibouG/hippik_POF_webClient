import React from 'react';
import logo from './logo.svg';
import NavigationMenu from '../../Components/NavigationMenu/NavigationMenu';
import UserMenu from '../../Components/UserMenu/UserMenu';

function AppHeader() {

  return (
  
      <header className="App-header">
        <div className="navcontainer">
            <NavigationMenu />
         </div>
         <div className="searchcontainer">
        
           
        </div>
        <div className="usercontainer">
          <UserMenu />
        </div>
      </header>

    );
}

export default AppHeader;
