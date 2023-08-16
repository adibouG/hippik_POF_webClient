import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';

import defaultImg from './assets/UserAvatar_Default.jpg';

type Props = {
    userImgSrc?: string;
    userStatus?: string;
  }
  

function UserAvatar({userImgSrc, userStatus}: Props) {
  return (
    <Container style={{height: "100%", position: "inherit", zIndex: 1030, right: 0, padding: 0, minWidth: "75px", minHeight: "50px",display: 'flex', flexDirection: "row-reverse"}}>
      <Image style={{position: "absolute", objectFit: "contain", height:"100%" ,minHeight: "50px"}} roundedCircle src={userImgSrc || defaultImg} /> 
      <Badge style={{position: 'absolute', bottom: 0,right: "25px", fontSize:'0.5em' }} pill >{userStatus || "not connected"}</Badge>
    </Container>    
)}

export default UserAvatar;