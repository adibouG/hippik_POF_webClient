
import { Outlet,} from 'react-router-dom' ;
import Stack from 'react-bootstrap/Stack';
import AppHeader from './AppHeader/AppHeader';
import AppBody from './AppBody/AppBody';
import AppFooter from './AppFooter/AppFooter';



function AppLayout() {
  return (
    <Stack>
      <AppHeader />
      <AppBody>
        <Outlet />
      </AppBody>
      <AppFooter  />
    </Stack>
    );
}

export default AppLayout;