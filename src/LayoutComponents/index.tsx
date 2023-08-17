
import Stack from 'react-bootstrap/Stack';
import AppHeader from '../LayoutComponents/AppHeader/AppHeader';
import AppBody from '../LayoutComponents/AppBody/AppBody';
import AppFooter from '../LayoutComponents/AppFooter/AppFooter';


interface Props {
  children?: React.ReactNode [];
}
function AppLayout({children}: Props ) {

  return (
    <Stack>
      <AppHeader />
      <AppBody>{children}</AppBody>
      <AppFooter  />
    </Stack>
    );
}

export default AppLayout;