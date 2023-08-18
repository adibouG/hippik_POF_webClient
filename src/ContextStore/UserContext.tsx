import React from 'react';
import type { User } from '../Types/@types.user';
import { UserData } from '../Types/@types.user';


export type UserContextType = {
    user: User | UserData | null;
    loggedAt: Date | null;
    userLogIn: (data: FormData, header: Headers, loginCallback?: Function | null) => Promise<boolean>;
  }

export const UserContext = React.createContext<UserContextType | null>(null);

type Props = {
    children?: React.ReactNode;
}
enum Action {
  None,
  LogInRequest,  
  LogIn,
  Update,  
  LogOutRequest, 
  LogOut
}

function UserProvider ({ children }: Props ) {
  
  const [user, setUser] = React.useState<User | null>(null);
  const [loggedAt, setLoggedAt] = React.useState<Date | null>(null);
  
  const actions = React.useRef([ Action.None ]);
  
  React.useEffect ( ( ) => {

    if (actions.current.at (actions.current.length - 1) === Action.LogInRequest && user && user.id) 
    {
      setLoggedAt (new Date ());
      actions.current.push (Action.LogIn);
    }
    return ;
  } , [user] );
  
  
  const userUpdate = (user: User) : void => {}
  
  const userLogIn = async (data: FormData, header: Headers, loginCallback?: Function | null)  : Promise<boolean> => {
    try 
    {
      actions.current.push (Action.LogInRequest);    
      const req: Request = new Request ('/api/login', { method: 'POST', body: data, headers: header });
      const res: Response= await fetch (req);
      if (res.ok)  
      { 
        console.log (`user ${data.get ('user')} logged in successfully`);
        const userData = await res.json ();
        console.log (userData);
        const logged = new UserData (userData);
        console.log (logged);
        setUser (logged);
        console.log (user);
        return true;
      }
      else
      {
        throw  new Error (res.statusText);
      }
    }  
    catch (e) 
    {
      const err: Error = e as Error;
      alert (err.message);

      return false;
    }  
  }

  const userLogOut = () : boolean => { 
    if (user)
    {
       setUser (null);
       return true;
    }
    else
    {
      return false;
    }
  } 

  const userContextObj = { user, loggedAt, userLogIn };
  
  return  (
    <UserContext.Provider value={userContextObj} >
        {children}
    </UserContext.Provider>
  )
}


  export default UserProvider;