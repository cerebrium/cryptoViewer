import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from '../components/navBar/navBar'
import '../styles/home/home.scss';

const Home = () => {
    // auth0
    const { user, isAuthenticated, isLoading } = useAuth0();

    return(
        <div className='homeContainer'>
            <NavBar />
        </div>
    )
}

export default Home