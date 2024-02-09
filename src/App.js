import React from 'react';
import MainPage from './pages/mainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<MainPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
