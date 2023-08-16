
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register() {
  return (
  
    <Container style={{margin: 'auto', width: 'auto',display: 'flex',justifyContent: 'center', alignItems: 'center'}} >
         <Form>
      <Form.Group className="mb-3" controlId="EmailInput">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="NameInput">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text"  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="PwdInput">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="IsAdminInput">
        <Form.Check type="checkbox" label="Create Admin Account" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      
    </Container>
 
       
  );
}



export default Register;