import React from 'react'
import Login from '../auth/Login'
import '../../styles/header/navMain.scss'

const NavBar = () => {
    return(
        <div className='navBarContainer'>
            <h2>CryptoViewer</h2>
            <Login />
        </div>
    )
}

export default NavBar