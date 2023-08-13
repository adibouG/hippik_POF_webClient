import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import defaultImg from './assets/RoundUserPic_Default.jpg';

interface Props {
    userImgSrc?: string;
  }
  

function RoundUserPic({userImgSrc}: Props) {
  return (
    <Container fluid>
      <Image src={userImgSrc || defaultImg}   roundedCircle /> 
    </Container>
  );
}

export default RoundUserPic;