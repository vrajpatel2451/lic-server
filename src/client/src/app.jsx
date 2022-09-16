import React from 'react';
import HeaderComponent from './components/headerComponent';
import './styles/style.css';

const App = () => {
  return (
    <div>
      <HeaderComponent />
      <h2 className="text-pri font-montserrat font-bold">Hello world</h2>
    </div>
  );
};

export default App;
