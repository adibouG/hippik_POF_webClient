import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';

import defaultImg from './assets/UserAvatar_Default.jpg';
import React from 'react';

interface Props {
    userImgSrc?: string;
    userStatus?: string;
    onLine?: boolean | null;
}

type Style = { container:  React.CSSProperties; image:  React.CSSProperties; badge:  React.CSSProperties } ;
const styling: Style = {
  container: {
    height: "100%", 
    position: "inherit", 
    zIndex: 1030, 
    right: 0, 
    padding: 0, 
    minWidth: "75px", 
    minHeight: "50px",
    display: 'flex',
    flexFlow: "row-reverse"
   },
  image: {  
    position: "absolute", 
    objectFit: 'contain', 
    height:"100%" ,
    minHeight: "50px"
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: "25px",
    fontSize:'0.5em' 
  }
};

function UserAvatar({userImgSrc, userStatus, onLine}: Props) {
  let displayStatus ;
  if (!onLine) 
  {
    displayStatus = 'No network';
    styling.badge.backgroundColor = 'red';
  }
  else 
  {
    displayStatus = userStatus || 'Not connected';
  }
  return (
    <Container style={styling.container}>
      <Image style={styling.image} roundedCircle src={userImgSrc || defaultImg} /> 
      <Badge style={styling.badge} pill >{displayStatus}</Badge>
    </Container>    
)}

export default UserAvatar;