
import AppLayout from './Components/AppLayout' ;
import PageIndex from './Pages';

import UserProvider from './ContextStore/UserContext';
import './App.css';
function App() {
  
  
  return (
    <div className="App">

    <UserProvider>
        <AppLayout>
          <PageIndex  />
        </AppLayout>
      </UserProvider> 
    </div>
    );
}

export default App;
