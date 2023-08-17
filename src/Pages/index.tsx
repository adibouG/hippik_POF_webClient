import {Routes, Route} from 'react-router-dom';
import Register from './Register/Register';
import MainBoard from './MainBoard/MainBoard';
function PageIndex() {

  return (

        <Routes>
          <Route path="/register" Component={Register} />
          <Route path="/" Component={MainBoard} />
        </Routes>
    

    );
}

export default PageIndex;
