import {BsFillCartCheckFill} from 'react-icons/bs';
import React, {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import StoresContext from '../context/StoresContext';
import AuthForm from '../components/AuthForm';

export default function AuthPage({action}) {
  const navigate = useNavigate();
  const {user, handleSignIn} = useContext(StoresContext);

  useEffect(()=> {
    if (user) navigate('/');
  }, [user, navigate])

  const welcomeMessage = action === 'sign-in'
    ? 'Please Sign in to continue'
    : 'Create an account to get started';
  return (
    <div className="row pt-5 align-items-center">
      <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-xl-4 offset-xl-4">
        <header className="text-center mb-1 pt-2 welcome-header">
          <h2 className="mb-2">
            <BsFillCartCheckFill className="mr-2" />
            Welcome to Retail Rater!
          </h2>
          <p className="mb-4 text-secondary">{welcomeMessage}</p>
        </header>
        <div className="card p-3">
          <AuthForm
          key={action}
          action={action}
          onSignIn={handleSignIn}
          />
        </div>
      </div>
    </div>
  )
}
