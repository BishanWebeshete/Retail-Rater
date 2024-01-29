import UpdateStore from '../components/UpdateStore';
import Navbar from '../components/Navbar';
import React, {useEffect, useContext} from 'react';
import StoresContext from '../context/StoresContext';
import {useNavigate} from 'react-router-dom';

function UpdatePage () {
  const {user} = useContext(StoresContext);
  const history = useNavigate();

  useEffect(()=> {
    if (!user) history('/sign-in');
  })

  return (
    <>
      <Navbar />
      <div>
        <div className="d-flex justify-content-center">
          <h1 className="mt-3 d-inline-block">Update Store</h1>
        </div>
        <UpdateStore />
      </div>
    </>
  )
}
export default UpdatePage;
