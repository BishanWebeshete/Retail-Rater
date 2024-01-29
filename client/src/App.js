import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './routes/Home';
import StoreDetails from './routes/StoreDetails';
import UpdatePage from './routes/UpdatePage';
import React, {useEffect, useState} from 'react';
import StoresContext from './context/StoresContext';
import jwtDecode from 'jwt-decode';
import Auth from './routes/AuthPage';

const tokenKey = 'react-context-jwt';

export default function App() {
  const [user, setUser] = useState();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [stores, setStores] = useState(undefined);
  const [selectedStore, setSelectedStore] = useState(undefined);
  const history = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    const user = token ? jwtDecode(token) : null;
    setUser(user);
    setIsAuthorizing(false);
  }, []);

  if (isAuthorizing) return null;

  function handleSignIn(result) {
    const { user, token } = result;
    localStorage.setItem(tokenKey, token);
    setUser(user);
  }

  function handleSignOut(result) {
    localStorage.removeItem(tokenKey);
    setUser(undefined);
    history('/sign-in');
  }

  const addStores = (store) => {
    setStores([...stores, store]);
  }

  return (
    <StoresContext.Provider value={{user, stores, handleSignIn, handleSignOut, setStores, addStores, selectedStore, setSelectedStore}}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<Auth action="sign-in" />} />
          <Route path='/sign-up' element={<Auth action="sign-up" />} />
          <Route path='/stores/:id' element={<StoreDetails />} />
          <Route path='/stores/:id/update' element={<UpdatePage />} />
        </Routes>
    </StoresContext.Provider>
  )
}
