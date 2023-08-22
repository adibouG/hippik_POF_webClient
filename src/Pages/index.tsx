
import {useContext} from 'react';
import {Routes, Route} from 'react-router-dom';
import LogIn from './LogIn/LogIn';
import Register from './Register/Register';
import Users from './Users/Users';
import MainBoard from './MainBoard/MainBoard';
import * as UserContext from '../ContextStore/UserContext';
import type { User } from '../Types/@types.user';


function PageIndex() {
  const userContext: UserContext.UserContextType | null = useContext(UserContext.UserContext);
  const user: User |  null | undefined = userContext?.user;
  const isAdmin: boolean = user?.role === 'admin' || user?.role === 'test';
  return (
    <Routes>
         
          {
            user && user.id && userContext?.loggedAt ?
            <>

              <Route path="/users" element={<Users userContext={userContext} />} />
                
                <Route path='/users/profile' />
                <Route path='/users/logout' />
                {
                  isAdmin &&
                    <Route path="/users/register" element={<Register user={user} />} />
                }               

              <Route path="/main" element={<MainBoard />} />
            </>
            :
                   <>
              <Route path="/register" element={ <Register user={user} /> } />
              <Route path="/*" element={ <LogIn userContext={userContext} /> } />
                   </>     
          }       

        </Routes>
    );
}

export default PageIndex;
