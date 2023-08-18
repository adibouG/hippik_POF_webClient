
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as UserContext from '../../ContextStore/UserContext';
import type { User } from '../../Types/@types.user';

interface Props {
    userContext?: UserContext.UserContextType | null;
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

function LogIn({userContext}: Props) {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
   
    try
    {
//      event.currentTarget.elements.
      event.preventDefault();
      event.stopPropagation ();
      const data: FormData = new FormData (event.currentTarget) ;
      const head:  Headers = new Headers ({ "Content-Type": "multipart/form-data" }) ;
      //const req:  Request = new Request ('/api/login', { method: 'POST', body: data, headers: head });
      console.log (data);
      const user = await  userContext?.userLogIn (data, head);
      //const res: Response= await fetch (req);
      //if (res.ok) return alert (`user ${data.get ('user')} logged in successfully`)
      return ; //else throw  new Error (res.statusText)
    } 
    catch (e) 
    {
      const err: Error = e as Error;
       alert (err.message);
    }
  }

  return (
    <Container style={ cont } >
      <Form onSubmit={ handleSubmit } style={ form }>
        <Form.Label>
          <h1>Log In</h1>
        </Form.Label>
        <Form.Group className="mb-3" controlId="userInput">
          <Form.Label>Name or Email address</Form.Label>
          <Form.Control name='user' type="text" placeholder="accountname or name@example.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="pwdInput">
          <Form.Label>Password</Form.Label>
          <Form.Control name='pwd' type="password"  />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}



export default LogIn;