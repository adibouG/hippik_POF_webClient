
import {useContext} from 'react';
import {Route, Routes} from 'react-router-dom';
import LogIn from './LogIn/LogIn';
import Contests from './Contests/Contests';
import Register from './Register/Register';
import Users from './Users/Users';
import MainBoard from './MainBoard/MainBoard';
import * as UserContext from '../ContextStore/UserContext';
import type { User } from '../Types/@types.user';
import AppLayout from '../Components/AppLayout';


function PageIndex() {
  const userContext: UserContext.UserContextType | null = useContext(UserContext.UserContext);
  const user: User |  null | undefined = userContext?.user;
  const sessionId: string |  null | undefined = userContext?.sessionId;
  const isAdmin: boolean = user?.role === 'admin' || user?.role === 'test';
  return (
  <Routes>
    { /* New User Access & other Guest requests Form / (sent to Admins) */ }
    <Route path="/register" element={ <Register user={user} /> } />

    <>
      {

        userContext && user && user.id 
        ? 
        // User Context set up i.e. User Logged & User session
        <Route element={ <AppLayout />} >
          <Route path="/main" element={<MainBoard />} />
          <Route path="/users/" element={<Users userContext={userContext} />} >
            <Route path="home" element={<Register user={user} />} />
            {
              isAdmin
              && <Route path="new" element={<Register user={user} />} />
            }               
          </Route>  {/*Users*/}
          <Route path="/contests" element={<Contests user={user} session={sessionId} />} />
        
        </Route> //AppLayout
        :
        // no User Context set up i.e. no User Loged nor User session  
        <Route path="/login" element={ <LogIn userContext={userContext} /> } />
      }       
    </>

  </Routes>

    );
}

export default PageIndex;
