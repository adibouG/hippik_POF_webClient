import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom' ;
import Spinner from 'react-bootstrap/Spinner';
import UserProvider from './ContextStore/UserContext';
import PageIndex from './Pages';
import './App.css';

  
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route  path="*" Component={PageIndex} /> 
  )
);


function App() {
  
  
  return (
    <div className="App">
      <UserProvider>
        <RouterProvider router={router} fallbackElement={<Spinner />} />
      </UserProvider> 
    </div>
    );
}

export default App;
