
import {useContext} from 'react';
import {Routes, Route} from 'react-router-dom';
import LogIn from './LogIn/LogIn';
import Register from './Register/Register';
import MainBoard from './MainBoard/MainBoard';
import * as UserContext from '../ContextStore/UserContext';
import type { User } from '../Types/@types.user';


function PageIndex() {
  const user: UserContext.UserContextType | null = useContext(UserContext.UserContext);
  return (
    <Routes>
         
          {
            user && user.user && user.loggedAt ?
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/main" element={<MainBoard />} />
            </>
            :
                        
              <Route path="/*" element={ <LogIn userContext={user} /> } />
          }       

        </Routes>
    );
}

export default PageIndex;
