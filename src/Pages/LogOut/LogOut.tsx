import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import {logger} from '../../Components/Logger/Logger';
import * as UserContext from '../../ContextStore/UserContext';
import type { User } from '../../Types/@types.user';
import type { Styling } from '../../Types/@types.styles';

import React, { ReactNode, useEffect, forwardRef, useRef, useState } from "react";
import { Navigate, useNavigate} from "react-router-dom";
import { FormText } from 'react-bootstrap';

interface Props {
    userContext?: UserContext.UserContextType | null;
}
const cont: Styling = { 
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





function LogOut({userContext}: Props) {
  
  
  const navig = useNavigate();
  const [isLoading, setIsLoading] = useState (false); 
  const [error, setError] = useState<Error>(); 


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
   
    try
    {
      event.preventDefault();
      event.stopPropagation ();

      const data: FormData = new FormData (event.currentTarget) ;
      const head:  Headers = new Headers ({ "Content-Type": "application/json" }) ;
      setIsLoading (true);
      const user = await  userContext?.userLogIn (data, head);
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
      <Container style={ cont } >
        <Form onSubmit={handleSubmit} style={ form }>
          <Form.Label><h1>Log Out</h1></Form.Label>
          <Form.Group className="mb-3" controlId="userInput">
            <Form.Label>Please Log Me Out Now</Form.Label>
         
            <Button variant="primary" type="submit" disabled={isLoading}>
            {
              isLoading 
              ? 
              <>
                <Spinner />
              </>
             
              : "LogOut"
            }
          </Button>
            </Form.Group>
        </Form>
        <FormText>
            {error?.message}
        </FormText>


      </Container>
    );
  }
//}



export default LogOut;