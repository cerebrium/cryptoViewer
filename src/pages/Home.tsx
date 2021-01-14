import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/home/home.scss';

const Home = () => {
    // auth0
    const { user, isAuthenticated, isLoading } = useAuth0();

    return(
        <div className='homeContainer'>
            <h1>Welcome to the app</h1>
            <h3>{user ? user.email : ''}</h3>
        </div>
    )
}

export default Home