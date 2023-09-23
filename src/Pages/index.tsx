
import {useContext} from 'react';
import {Navigate, Route, Routes, redirect} from 'react-router-dom';
import LogIn, {action as loginAction} from './LogIn/LogIn';
import LogOut from './LogOut/LogOut';
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
  const loginFunc: any  = userContext?.userLogIn ;
  const isLogged: boolean = user ? true : false;
  const isAdmin: boolean = user?.role === 'admin' || user?.role === 'test';
  return (
  <>
  <Routes>
    
    <Route  element={ <AppLayout />} >
      {
        isLogged
        ? 
        // User Context set up i.e. User Logged & User session
        <>
          <Route path="main" element={<MainBoard />} />
          <Route  path="users/*"  Component={Users}  >
            <Route path="home" element={<Register user={user} />} />
            {
              isAdmin
              && <Route path="create" element={<Register user={user} />} />
            }               
          </Route>  {/*Users*/}
          <Route path="contests" element={<Contests user={user} session={sessionId} /> } />
          <Route path="logout" element={<LogOut user={user} session={sessionId} /> } />
        </>
          
        :
        // New User Access & other Guest requests Form / (sent to Admins) 
            <>
        <Route path="getaccount" element={ <Register user={user} /> } />
        <Route  path="login" Component={LogIn} 
                action={loginAction ({ loginFunc })}  
        />  
        </>
      
      }
        
    </Route> {/*AppLayout*/}
  </Routes>
  <Navigate to={'/login'} />
</>
    );
}

export default PageIndex;
