import React, { SyntheticEvent, useEffect, useState } from 'react';
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
import { BackedObjects } from './types'
import ExchangeDisplay from './components/landingPage/ExchangeDisplay'
import SingleItem from './components/landingPage/SingleItem'
import ScrollTop from './components/landingPage/ScrollTop'

const App = () => {
    // redux
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const authData = useSelector(selectAuth)
  const dispatch = useDispatch();

  // local state
  const [ content, setContent ] = useState<JSX.Element>()

    // api data
    const [ apiData, setApiData ] = useState<Array<BackedObjects>>([])

    // render main component on selectiong
    const [ mainDisplayComponent, setMainDisplayComponent ] = useState<JSX.Element>()

  // auth0
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, isAuthenticated, isLoading } = useAuth0();

  // api functions
  // post
  async function postData(url = '', data={}) {
    const response = await fetch(url, { 
        method: 'POST', 
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response ? response.json() : console.log('no reponse')
  }; 

  // get
  let apiKey: string | undefined = process.env.REACT_APP_COIN_BASE_API_KEY
  async function getData(url = '') {
    const response = await fetch(url, { 
        method: 'GET', 
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'X-CoinAPI-Key': `${apiKey}`,
        }
    });
    return response ? response.json() : console.log('no reponse')
  }; 

  // retrive data
  useEffect( () => {
    let localStorageExchanges = localStorage.getItem('exchanges')
    if (localStorageExchanges !== null) {
      if (localStorageExchanges.length > 0) {
        setApiData(JSON.parse(localStorageExchanges))
      }
    } else {
      getData('https://rest.coinapi.io/v1/assets/').then( response => {
        console.log(response)
        if (response.length > 0) {
          localStorage.setItem('exchanges', JSON.stringify(response))
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // on authentication save user email to redux
  useEffect( () => {
    if (isAuthenticated) {
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

  // if item selected set as main item
  const handleSelectingMainItem = (e: React.SyntheticEvent<EventTarget>, selectedItem: BackedObjects) => {
    if (selectedItem) {
      setMainDisplayComponent(
        <SingleItem data={selectedItem}/>
      )
    }
  }

  // handle the auth
  useEffect( () => {
    // if authenticated route to home page
    if (isAuthenticated) {
      setContent(
        <Router>
          <Route exact path = '/' render={ () => <Home />}/>
        </Router>
      )
    // no auth let them view the standard landing page
    } else {
      setContent(
        <div className="mainPageContainer">
          <div className='navContainer'>
            <NavBar />
          </div>
          <div className='scrollTopContainer'>
            <ScrollTop data={apiData}/>
          </div>
          <div className='landingPageContentContainer'>
            <div className='exchangeScroll'>
              <ExchangeDisplay 
                data={apiData}
                selectItem={handleSelectingMainItem}
              />
            </div>
            <div className='singleElementContainer'>
              {mainDisplayComponent}
            </div>
          </div>
        </div>
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, apiData, mainDisplayComponent])

  return (
    <>
      {content}
    </>
  );
}

export default App;
