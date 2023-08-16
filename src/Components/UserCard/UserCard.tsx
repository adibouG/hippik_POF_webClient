
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import UserAvatar from '../UserAvatar/UserAvatar'; 

export interface User {
  name?: string;
  role?: string ;
  mail?: string ;
  status?: string;
  imgSrc?: string;
}


type Props = {
  user?: NonNullable<User> | null;
  children?: React.ReactNode ;
} 

function UserCard({user, children}: Props) {

  const uName: string = user?.name || ''; 
  const uMail: string = user?.mail || ''; 
  const uRole: string = user?.role || ''; 

    return (
      <Card style={{ position: 'relative', minWidth: '150px', minHeight: '50px', display: 'flex', flexFlow: 'row-reverse' }}>
        <UserAvatar userImgSrc={user?.imgSrc} userStatus={user?.status} />
        
        <Card.Body style={{ width: 'fit-content', padding: 0,    height: 'inherit' }}>
          {
            user && 
            <>
              <Card.Title>{uName}</Card.Title>
              <Card.Text>{uRole}</Card.Text>
              <Card.Text>{uMail}</Card.Text>
            </>
          }
              {children}
        </Card.Body>
      </Card>
    );
  }
  
  

export default UserCard;