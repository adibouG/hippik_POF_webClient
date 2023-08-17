import React from 'react';


type Props = {
    children?: React.ReactNode ;
}

function AppBody({ children }: Props) {

  return (
  

<div className="main-container">
        <div className="main">
          {children}
        </div>
</div>

);
}

export default AppBody;
