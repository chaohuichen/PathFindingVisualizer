import React from 'react';
import 'react-notifications-component/dist/theme.css';
import './App.css';
import Grid from './Grid';
import Header from './Header';
import ReactNotification from 'react-notifications-component';
function App() {
  return (
    <div className='App'>
      <Header />
      <ReactNotification />
      <Grid />
    </div>
  );
}

export default App;
