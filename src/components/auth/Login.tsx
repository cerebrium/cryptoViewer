import React from 'react';
import '../../styles/header/login.scss';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  // !isAuthenticated && 
  return (
    <button className='loginButton' onClick={loginWithRedirect}>Log in</button>
  );
}

export default LoginButton;