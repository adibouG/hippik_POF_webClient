
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import * as UserContext from '../../ContextStore/UserContext';
import type { User } from '../../Types/@types.user';
import Register from '../Register/Register';
import TableList from '../../Components/TableList/TableList';
import { useEffect, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import { Col } from 'react-bootstrap';
import { ConsoleLogger } from '../../Components/Logger/Logger';



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
    user?: User | null;
    session?: string | null;
}
type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
}

enum UserAdminRoles { Admin = 'admin', Test = 'test', Dev = 'dev' };

function Contests ({user, session} :Props) {
    
    const [isLoading, setIsLoading] = useState (false);
    const [data, setData] = useState ();
    const [key, setKey] = useState ("home");
    const [show, setShow] = useState(false);

 
    const name = user?.name;
    const isAdmin = user?.role === 'admin' || user?.role === 'test' ;
    
    const handleClose = () => setShow(false);
    const showContestCreate = () => setShow(true);
   
    const handleClick = (e: React.MouseEvent<HTMLElement> & { target: HTMLButtonElement }) => { 
        console.log (e)
        const {target} = e ;
        if (target)
        { 
   // let t = target ;
   // if (t.id !== key) setKey (t.id);
        }  
    }

    const handleSelect = (eventKey: string | null,  event?: React.SyntheticEvent<any, Event>) => {
        if (eventKey && eventKey !== key) setKey (eventKey);

    }   

    useEffect (() => { 
        if (key === "contests") 
        { 
            //getContests ();
            
  }
  return;
}, [key])


useEffect (() => { 
  
  setIsLoading (loadingState => !loadingState); 

}, [data])

const getContests = async () => {
  try
  {
    const results = await fetch ('/api/contests', { method: "GET" });
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

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
   
    try
    {
    // event.currentTarget.elements.
        event.preventDefault(); 
        event.stopPropagation ();     
        const data: FormData = new FormData (event.currentTarget) ;
        
        const id =  btoa (encodeURIComponent (user?.id + ':' + session)) ;
       
        
        const head:  Headers = new Headers ({"Authorization": "Basic " +   id   }) ;
     
        const req:  Request = new Request ('/api/contests', { method: 'POST', body: data, headers: head });
        await fetch (req) ;
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
        <h1>Contests Page</h1>
        <Tabs   defaultActiveKey="home"
                activeKey={key}
                id="contestControls"
                className="mb-3"
                onSelect={handleSelect}
                onClick={handleClick}
          >
            <Tab eventKey="home" title="Home" > 
                {
                  `${name} Contest Home Page`
                }    
                  <Container>
                    <Row>

                      <Button onClick={showContestCreate}>
                         Create New Contest
                      </Button>

                    </Row>

                    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
                      <Modal.Header closeButton>
                        <Modal.Title>New Contest</Modal.Title>
                      </Modal.Header>
                      <Form  onSubmit={handleSubmit}> 
                        <Modal.Body>
                           <Form.Group className="mb-3" controlId="ControlName">
                           <Form.Label>Contest Name</Form.Label>
                           <Form.Control name='name' type="text" placeholder="" />
                         </Form.Group>
                         <Form.Group className="mb-3" controlId="ControlLocation">
                           <Form.Label>Location</Form.Label>
                           <Form.Control name='location' type='location' />
                         </Form.Group>
                                
                         <Form.Group className="mb-3" controlId="ControlDates">
                          <Row>
                            <Col>
                           <Form.Label>Start Date</Form.Label>
                           <Form.Control name='startdate' type='date' />
                          </Col>
                          <Col>
                           <Form.Label>End Date</Form.Label>
                           <Form.Control name='enddate' type='date' />
                          </Col>
                          </Row>
                         </Form.Group>
                         <Form.Group className="mb-3" controlId="ControlDescription">
                           <Form.Label>Description</Form.Label>
                           <Form.Control name='desc' type='text' />
                         </Form.Group>
                                
                         <Form.Group className="mb-3" controlId="ControlFile">
                           <Form.Label>Presentation Image</Form.Label>
                           <Form.Control name='file' type='File' />
                         </Form.Group>
                          
                        </Modal.Body>
                        
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          <Button variant="primary" type="submit">
                            { 
                            isLoading  &&
                              <Spinner />
                            }
                            Create
                          </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

               </Container>
            </Tab>
            <Tab eventKey="contests" title="contests" >
              {
                data &&
                <TableList data={data} editable={isAdmin} title='Contests'/>
              }
            </Tab>
            <Tab eventKey="register" title="Register"  disabled={isAdmin}  >
               <Register />
            </Tab>

        </Tabs>
    </Container>
   
  );
}


export default Contests;