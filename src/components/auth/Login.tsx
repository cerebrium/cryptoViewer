import React, { useEffect, useState } from 'react';
import '../../styles/header/login.scss';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  // add login functionality
  const {
    loginWithRedirect,
  } = useAuth0();

  // local state
  const [ loginText, setLoginText ] = useState('Login')
  const [ content, setContent ] = useState<JSX.Element>()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, isAuthenticated, isLoading } = useAuth0();

  // handle changing content after login
  useEffect( () => {
    if (isAuthenticated) {
      if (user) {
        setContent(
          <div className='loginDiv'>
            <h3 style={{color: 'white'}}>{user.name}</h3>
          </div>
        )
      }
    } else {
      setContent(
        <button className='loginButton' onClick={loginWithRedirect}>
          <h3>{loginText}</h3>
        </button>
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return (
    <>
      {content}
    </>

  );
}

export default LoginButton;