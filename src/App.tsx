import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import NavBar from './components/navBar/navBar'
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import Home from './pages/Home'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { 
  selectAuth,
  addAuth
} from './features/authSlice'

const App = () => {
  // auth0
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, isAuthenticated, isLoading } = useAuth0();

  // redux
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const authData = useSelector(selectAuth)
  const dispatch = useDispatch();

  // local state
  const [ content, setContent ] = useState<JSX.Element>()

  useEffect( () => {
    if (isAuthenticated) {
      console.log(user)
      dispatch(addAuth(
          {
            username: user.name,
            email: user.email
          }
        )
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  // handle the auth
  useEffect( () => {
    if (isAuthenticated) {
      setContent(
        <Router>
          <Route exact path = '/' render={ () => <Home />}/>
        </Router>
      )
    } else {
      setContent(
        <div className="mainPageContainer">
          <h1>CryptoViewer</h1>
          <NavBar />
        </div>
      )
    }
  }, [isAuthenticated])

  return (
    <>
      {content}
    </>
  );
}

export default App;
