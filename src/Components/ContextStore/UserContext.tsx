import React from 'react';
import type { User } from '../../Types/@types.user';


export type UserContextType = {
    user: User | null;
    loggedAt: Date | null;
  }

const NoUser: UserContextType = { user: null , loggedAt: null };
const UserContext = React.createContext<UserContextType | null>(NoUser);

type Props = {
    children?: React.ReactNode;
}

function UserProvider ({ children }: Props ) {
  const [user, setUser] = React.useState<User | null>(null);
}

function UserLogIn (user: User) : void {}

function UserLogOut () : boolean { 
    if (1) return true;
    return false;
} 


  export default UserContext;