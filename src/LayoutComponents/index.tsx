
import Stack from 'react-bootstrap/Stack';
import AppHeader from '../LayoutComponents/AppHeader/AppHeader';
import AppBody from '../LayoutComponents/AppBody/AppBody';
import AppFooter from '../LayoutComponents/AppFooter/AppFooter';


function AppLayout() {

  return (
    <Stack>
      <AppHeader />
      <AppBody />
      <AppFooter  children={null} />
    </Stack>
    );
}

export default AppLayout;