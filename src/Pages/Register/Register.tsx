
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register() {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
   
    try
    {
//      event.currentTarget.elements.
      event.preventDefault();
      event.stopPropagation ();
      const data: FormData = new FormData (event.currentTarget) ;
      const head:  Headers = new Headers ({ "Content-Type": "multipart/form-data" }) ;
      const req:  Request = new Request ('/api/users', { method: 'POST', body: data, headers: head });
      const res: Response= await fetch (req);
      if (res.ok) return alert (`user ${data.get ('name')} created, an email  was sent to ${data.get ('mail')}`)
      else throw  new Error (res.statusText)
    } 
    catch (e) 
    {
      const err: Error = e as Error;
       alert (err.message);
    }
  }

  return (
  
    <Container style={{ margin: '3% auto', width: 'auto',display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
      <Form onSubmit={ handleSubmit } style={{border:"1px solid grey" ,padding: '15px', borderRadius: '15px', boxShadow: '0px 0px 20px 20px'}}>
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
        <Form.Group className="mb-3" controlId="IsAdminInput">
          <Form.Check name='isAdmin' type="checkbox" label="Create Admin Account" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}



export default Register;