//import {ReactNode} from 'react';
import logo from './logo.svg';

type Props = {
    children: React. ReactNode
} 

function AppFooter({children}: Props) {

  return (
    <div className="App-footer">
        [children]
    </div>
    );
}

export default AppFooter;
