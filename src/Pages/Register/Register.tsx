
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as UserContext from '../../ContextStore/UserContext';
import type { User } from '../../Types/@types.user';

import { useState, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';

interface Props {
  user?: User | null;
  registerCb?: Function  | null;
  isLoading?: boolean;
}

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

function Register ({user, isLoading = false, registerCb = null}: Props) {
  
  const [isBusy, setIsBusy] = useState(false);
 // const [] = useState(false);

  const isAdmin = user?.role === 'admin' || user?.role === 'test' ;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try
    {

//      event.currentTarget.elements.
      event.preventDefault();
      event.stopPropagation ();
      const data: FormData = new FormData (event.currentTarget) ;
      const head:  Headers = new Headers ({ "Content-Type": "multipart/form-data" }) ;
      const req:  Request = new Request ('/api/users/register', { method: 'POST', body: data, headers: head });
      if (!isLoading) setIsBusy(true);
      const res: Response= await fetch (req);
      if (res.ok) 
      {
        alert (`user ${data.get ('name')} created, an email was sent to ${data.get ('mail')}`)
      }
      else throw  new Error (res.statusText)
    } 
    catch (e) 
    {
      const err: Error = e as Error;
      alert (err.message);
    }
    finally 
    {
      if (isBusy) setIsBusy (false);
    }
  }

  return (
  
    <Container style={cont} >
      <Form onSubmit={handleSubmit} style={form} >
        <Form.Label>
          <h1>Register User Account</h1>
        </Form.Label>
        <Form.Group className="mb-3" controlId="EmailInput">
          <Form.Label>Email address</Form.Label>
          <Form.Control name='email' type="email" placeholder="name@example.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="NameInput">
          <Form.Label>Name</Form.Label>
          <Form.Control name='name' type="text"  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="PwdInput">
          <Form.Label>Password</Form.Label>
          <Form.Control name='pwd' type="password"  />
        </Form.Group>
        { 
          user && isAdmin 
          &&
            <Form.Group className="mb-3" controlId="IsAdminInput">
              <Form.Check name='isAdmin' type="checkbox" label="Create Admin Account" />
            </Form.Group>
        }
        {
          user 
          &&
          <Form.Group className="mb-3" controlId="userAvatarInput">
            <Form.Label>Avatar</Form.Label>
            <Form.Control name='userAvatar' type="file" />
          </Form.Group>
        }
        <Button variant="primary" type="submit" disabled={isBusy || isLoading} >
        {
          isBusy || isLoading ? 
            <>
              <Spinner as="span" animation="border"
                      size="sm" role="status" aria-hidden="true"
              />
              'Loading...' 
            </>
              :
                'Submit'
        }
        </Button>
      </Form>
    </Container>
  );
}



export default Register;