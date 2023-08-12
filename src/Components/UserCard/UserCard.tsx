
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import RoundUserPic from '../RoundUserPic/RoundUserPic';
import { Component, ReactComponentElement } from 'react';

type Props = {
    children: React.ReactNode
} 

function UserCard(children: Props) {

    const name: string | undefined = "me";
    const role: string | undefined = "dev";
    const mail: string | undefined = "mail";
    const userImgSrc: string | undefined = "/fdsf/fds.jpg"; 
      
    return (
      <Card style={{ width: '18rem' }}>
        <RoundUserPic userImgSrc={userImgSrc} />
        <Card.Body>
          <Card.Title>{role}</Card.Title>
          <Card.Text>
          {`${name}, ${mail}`}
          </Card.Text>
            [children]
        </Card.Body>
      </Card>
    );
  }
  
  

export default UserCard;