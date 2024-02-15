import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import MainPage from './pages/mainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='*' element= {<MainPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
