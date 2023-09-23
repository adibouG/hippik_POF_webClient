import React, { useContext } from 'react';
import type { User } from '../Types/@types.user';
import { UserData } from '../Types/@types.user';
import type { CProps } from '../Types/@types.props';


export type UserContextType = {
    user: User | UserData | null;
    sessionId: string | null;
    loggedAt: Date | null;
    userLogIn?: (data: any, header?: Headers, loginCallback?: Function | null) => Promise<boolean> ;
    userLogOut?: () => Promise<boolean> ;
  }
  
const defaultUser = { 
  user: null,
  sessionId: null,
  loggedAt:  null
 };

export const UserContext = React.createContext<UserContextType>(defaultUser);

enum Action {
  None,
  LogInRequest,  
  LogIn,
  Update,  
  LogOutRequest, 
  LogOut
}


function UserProvider ({ children }: CProps ) {
  
  const [user, setUser] = React.useState<User | null>(null);
  const [loggedAt, setLoggedAt] = React.useState<Date | null>(null);
  const [sessionId, setSessionId] = React.useState<string | null>(null);
  
  const actions = React.useRef([ Action.None ]);
  
  React.useEffect ( ( ) => {
    
    if (actions.current.at (-1) === Action.LogInRequest && user && user.id) 
    {
      setLoggedAt (new Date ());
      actions.current.push (Action.LogIn);
    }
    else if (actions.current.at (-1) === Action.LogIn && !user) 
    {
      const userCookie = getCookie ('user');
      const userLoggedAtCookie = getCookie ('userLoggedAt');
      const userSessionIdCookie = getCookie ('sessionid');
      if (userCookie) 
      { 
        const userData = new UserData (JSON.parse (userCookie));
        setUser (userData);
      }
      if (userLoggedAtCookie) 
      {
        const userLoggedAt = new Date (userLoggedAtCookie); 
        setLoggedAt (userLoggedAt); 
      }
      if (userSessionIdCookie) 
      {
        const userSessionId = userSessionIdCookie ; 
        setSessionId (userSessionId); 
      }
    }
    return ;
  } , [user, sessionId, loggedAt] );
  
  

  function getCookie (name: string) {
    let value = '';
    const cookies = decodeURIComponent (document.cookie).split (';')
    const cookie = cookies.find (item => item.includes (`${name}=`));
    if (cookie)
    {
      let result = cookie.split ('=').at (1)?.toString () || ''; 
      value = (result.startsWith ('j:{' )) ? result.substring (`j:`.length, result.length) : result; // needed to get ride of expressjs 'hint' added to a json object  
    }
    return value;   
  }

  
  const userLogIn = async (data: any, header?: Headers, loginCallback?: Function | null)  : Promise<boolean> => {
    try 
    {
      actions.current.push (Action.LogInRequest);    
//      const user = data.get ('user') as string; 
  //    const pwd = data.get ('pwd') as string; 
    //  const dataToSend =  { user , pwd }; 
     // const res: Response = await fetch ('api/login', { method: 'POST', body: JSON.stringify(dataToSend), headers: header });
      const res: Response = await fetch ('api/login', { method: 'POST', body: data, headers: header });
      if (res.ok)  
      { 
        console.log (`user ${user} logged in successfully`);
        const userData = await res.json ();
        const logged = new UserData (userData);
        const session = getCookie ('sessionid');
        if (session) 
        {
          setUser (logged);
          setSessionId (session);
          setLoggedAt (new Date ());
        }
        if (loginCallback) loginCallback ();
        return true;
      }
      else
      {
        throw  new Error (res.statusText);
      }
    }  
    catch (e) 
    {
      const err = e as Error;
      throw  err;
    } 
  }

  const userLogOut = async () : Promise<boolean> => { 
    try
    {

      actions.current.push (Action.LogOutRequest);    
      
      const dataToSend = user; 
      const sessionid = getCookie ('sessionid');
      const header = new Headers ();
      header.append ('Content-Type', 'application/json');
      header.append ('Authorization', `Basic ${ btoa (user?.id + ':' + sessionid)}`);
      //const req: RequestInfo = new Request ('api/login', { method: 'POST', data: d, headers: header });
      const res: Response = await fetch ('/api/logout', {method: 'POST', body: JSON.stringify(dataToSend), headers: header });
      if (res.ok)  
      { 
        actions.current.push (Action.LogOut);    
        console.log (`user ${user?.name} logged out successfully`);
        setUser (null);
        return true;
      }
      else
      {
        setUser (null);
        return false ;
      }
    }  
    catch (e) 
    {
      const err: Error = e as Error;
      setUser (null);
      alert (err.message);
      return false;
    }  
  } 

  const userContextObj = { user, sessionId, loggedAt, userLogIn,  userLogOut };
  
  return  (
    <UserContext.Provider value={userContextObj} >
        {children}
    </UserContext.Provider>
  )
} 
 
export const useUserContext = () => useContext (UserContext) ; 

export default UserProvider;  