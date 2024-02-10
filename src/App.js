import React from 'react';
import MainPage from './pages/mainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './pages/login';
import { AuthProvider } from './middleware/authContext';
// import PrivateRoute from './middleware/privateRoute';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element= {<MainPage/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
