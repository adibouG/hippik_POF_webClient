
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import RoundUserPic from '../RoundUserPic/RoundUserPic';

export interface User {
  name?: string;
  role?: string ;
  mail?: string ;
  imgSrc?: string;
}


type Props = {
  user?: NonNullable<User> | null;
  children?: React.ReactNode[] ;
} 

function UserCard({user, children}: Props) {

  

    return (
      <Card style={{ width: '18rem' }}>
        <RoundUserPic userImgSrc={user?.imgSrc} />
        <Card.Body>
          <Card.Title>{user?.role}</Card.Title>
          <Card.Text>
          {`${user?.name}, ${user?.mail}`}
          </Card.Text>
            {children}
        </Card.Body>
      </Card>
    );
  }
  
  

export default UserCard;