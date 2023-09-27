import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form  from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { FormEvent, useEffect, useState, useContext } from "react";
import { Form as RForm, Navigate, useFetcher, useFormAction, useLoaderData, useNavigate, ActionFunctionArgs} from "react-router-dom";
import {logger} from '../../Components/Logger/Logger';
import WaitDots from '../../Components/WaitDots/WaitDots';
import {useUserContext} from '../../ContextStore/UserContext';
import type { User } from '../../Types/@types.user';
import type { Styling } from '../../Types/@types.styles';
import type { CProps } from '../../Types/@types.props';
import './LogIn.css';


export function action ({ loginFunc }: any) {
  return async function ({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const user = await loginFunc (formData); 
  }
}

function LogIn ({ loginCb }: CProps) {
  
  const navig = useNavigate();
  const fetcher = useFetcher() ;
  const formAct = useFormAction ();
  const ldata = useLoaderData();
  const [isLoading, setIsLoading] = useState (fetcher.state !== 'idle'); 
  const [error, setError] = useState<Error>(); 
  const userContext = useUserContext (); 
  const {user, sessionId, userLogIn} = userContext;

  //   if (!userContext?.user) 
  //   {
  //     const user = userContext?.getCookie('user');
  //     if (user?.length) 
  //     {
  //        userContext?.setUser (JSON.parse(user));    
  //        const session = userContext?.getCookie('session');

  //     }
  //   } 
  // }, []);

  
 const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  
  try
    {
//      event.currentTarget.elements.
      event.preventDefault();
 //     event.stopPropagation ();

      const data: FormData = new FormData (event.currentTarget) ;
      const head:  Headers = new Headers ({ "Content-Type": "multipart/form-data" }) ;

      setIsLoading (true);
      const user = userLogIn ? await userLogIn (data, head) : null;
      setIsLoading(false);
      if (user) 
      {
        navig('/main');
      }
      return ;
    } 
    catch (e) 
    {
      const err: Error = e as Error;
      logger.error (err)
      setIsLoading(false);
      setError (err);

    }
    
  }

    return (
      <Container className='LogIn'  >
        <RForm className='form' method="POST" action='/api/login' encType='multipart/form-data' 
        onSubmit={handleSubmit}
         >
        {
          isLoading &&
          <div className='LoadingModalPosition'>
            <Container className={isLoading? 'ShowLoadingModal' : 'HideLoadingModal' } >
               <Spinner />
            </Container>  
          </div>
        }
          <Form.Label><h1>Log In</h1></Form.Label>
          <Form.Group className="mb-3" controlId="userInput">
            <Form.Label>Name or Email</Form.Label>
            <Form.Control name='user' type="text" placeholder="accountname or name@example.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="pwdInput">
            <Form.Label>Password</Form.Label>
            <Form.Control name='pwd' type="password"  />
          </Form.Group>
         
          <Form.Group as={Row} className="mb-3" controlId="errorDisplay">
            <Form.Text muted>
                {error?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" >
        
            <Button variant="primary" type="submit" disabled={isLoading}>
              {
                isLoading ? <WaitDots /> : 'LogIn'
              }
            </Button>
        
          </Form.Group>
        </RForm>

      </Container>
    );
  }
//}



export default LogIn;