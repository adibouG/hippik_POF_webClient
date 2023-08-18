
import Stack from 'react-bootstrap/Stack';
import AppHeader from './AppHeader/AppHeader';
import AppBody from './AppBody/AppBody';
import AppFooter from './AppFooter/AppFooter';


interface Props {
  children?: React.ReactNode;
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