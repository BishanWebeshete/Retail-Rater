// import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import StoreDetails from './routes/StoreDetails';
import UpdatePage from './routes/UpdatePage';
import { StoresContextProvider } from './context/StoresContext';

function App() {
  return (
    <StoresContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/stores/:id' element={<StoreDetails />} />
          <Route path='/stores/:id/update' element={<UpdatePage />} />
        </Routes>
    </StoresContextProvider>
  )
}

export default App;
