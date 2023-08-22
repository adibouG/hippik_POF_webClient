
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import * as UserContext from '../../ContextStore/UserContext';
import type { User } from '../../Types/@types.user';
import Register from '../Register/Register';
import TableList from '../../Components/TableList/TableList';
import { useEffect, useState } from 'react';
import { TabContainerProps } from 'react-bootstrap';

const cont = { 
  margin: "3% auto",
  width: 'auto', 
  display: 'flex',
  flexFlow : "column",
  justifyContent: 'center',
  alignItems: 'center' 
};
const form = { 
  border:"1px solid grey",
  padding: '15px', 
  borderRadius: '15px', 
  boxShadow: '0px 0px 20px 20px' 
};
interface Props {
    userContext?: UserContext.UserContextType;
}
type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
}

enum UserAdminRoles { Admin = 'admin', Test = 'test', Dev = 'dev' };


function Users({userContext}:Props) {

const user = userContext?.user;
const name = user?.name;
const isAdmin = user?.role === 'admin' || user?.role === 'test' ;

const [isLoading, setIsLoading] = useState (false);
const [data, setData] = useState ();
const [key, setKey] = useState ("home");

const handleClick = (e: React.MouseEvent<HTMLElement> & { target: HTMLButtonElement }) => { 
  console.log (e)
  const {target} = e ;
  if (target) {
   // let t = target ;
   // if (t.id !== key) setKey (t.id);
  } 
}
const handleSelect = (eventKey: string | null,  event?: React.SyntheticEvent<any, Event>) => {
  if (eventKey && eventKey !== key) setKey (eventKey);

}

useEffect (() => { 
  
  if (key === "profile") { 
    setIsLoading (true); 
    getUsersAccounts ();
 }
  return;
}, [key])


useEffect (() => { 
  
  setIsLoading (loadingState => !loadingState); 

}, [data])

const getUsersAccounts = async () => {
  try
  {
    const results = await fetch ('/api/users', { method: "GET" });
    if (results.ok) 
    {
      const userList = await results.json ();
      console.log (userList)
      setData (userList);
    }
    return;
  }
  catch (e)
  { 
    console.log(e);
    const err = new Error ('fetch issue');
    alert (err.message)
    if (isLoading) setIsLoading (false);
  }
}
  
  return (
    <Container style={ cont } >
        <h1>Users Account Page</h1>
        <Tabs   defaultActiveKey="home"
                activeKey={key}
                id="usersControls"
                className="mb-3"
                onSelect={handleSelect}
                onClick={handleClick}
          >
            <Tab eventKey="home" title="Home" tabAttrs={{id:"home"}}> 
                {
                  `${name} Home Page`
                }    
            </Tab>
            <Tab eventKey="profile" title="Profile" tabAttrs={{id:"profile"}}>
              {
                data &&
                <TableList data={data} title='Accounts'/>
              }
            </Tab>
            <Tab eventKey="register" title="Register"  disabled={isAdmin}  >
               <Register />
            </Tab>

        </Tabs>
    </Container>
   
  );
}



export default Users;