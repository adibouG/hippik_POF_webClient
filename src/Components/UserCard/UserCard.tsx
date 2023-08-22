
import Card from 'react-bootstrap/Card';
import UserAvatar from '../UserAvatar/UserAvatar'; 
import type { UserDisplayData } from '../../Types/@types.user';

interface Props {
  user?: UserDisplayData | null;
  onLine?: boolean | null;
  children?: React.ReactNode ;
} 

function UserCard({user, onLine}: Props) {

  const uName: string = user?.name || ''; 
  const uRole: string = user?.role || ''; 

    return (
      <Card style={{ position: 'relative', minWidth: '150px', minHeight: '50px', display: 'flex', flexFlow: 'row-reverse', }}>
        <UserAvatar userImgSrc={user?.imgSrc} userStatus={user?.status} onLine={onLine} />     
        <Card.Body style={{ width: '100%', padding: 0, height: 'inherit' }}>
          {
            user && 
            <>
              <Card.Title>{uName}</Card.Title>
              <Card.Text>{uRole}</Card.Text>
            </>
          }
        </Card.Body>
      </Card>
    );
  }
  
  

export default UserCard;