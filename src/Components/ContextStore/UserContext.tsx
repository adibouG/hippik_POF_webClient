import React from 'react';
import type { User } from '../../Types/@types.user';


export type UserContextType = {
    user: User | null;
    loggedAt: Date | null;
  }

const NoUser: UserContextType = { user: null , loggedAt: null };
export const UserContext = React.createContext<UserContextType | null>(NoUser);

type Props = {
    children?: React.ReactNode;
}

function UserProvider ({ children }: Props ) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loggedAt, setLoggedAt] = React.useState<Date | null>(null);
  const userUpdate = (user: User) : void => {}

  const userLogIn = (user: User) : void => {}

  const userLogOut = () : boolean => { 
    if (1) return true;
    return false;
  } 

  const userContextObj = { user, loggedAt, userUpdate, userLogIn, userLogOut };
  
  return  (
    <UserContext.Provider value={userContextObj} >
        {children}
    </UserContext.Provider>
  )
}


  export default UserProvider;