import React, {useContext} from 'react';
import StoresContext from '../context/StoresContext';

export default function Navbar() {
  const {handleSignOut} = useContext(StoresContext);

  return (
    <nav className="navbar bg-primary display-7 px-md-5">
      <a className="fs-3 text-white retail-rater-text" href="/">Retail-Rater</a>
      <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
    </nav>
  )
}
