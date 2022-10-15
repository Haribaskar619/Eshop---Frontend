import './app.css';
import Router from './routes';
import React from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
function App() {
  return(
    <div className='app'>
      <Router/>
    </div>
  )
}

export default App;
