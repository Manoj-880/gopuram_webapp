import React from 'react';
import MainPage from './pages/mainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './pages/login';

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
