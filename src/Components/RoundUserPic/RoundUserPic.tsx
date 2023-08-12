import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

interface Props {
    userImgSrc: string;
  }
  

function RoundUserPic({userImgSrc}: Props) {
  return (
    <Container>
      <Row>

        <Col xs={6} md={4}>
           <Image src={userImgSrc}   roundedCircle /> 
        </Col>
   
      </Row>
    </Container>
  );
}

export default RoundUserPic;