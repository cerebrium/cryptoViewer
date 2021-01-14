import React from 'react'
import Login from '../auth/Login'
import '../../styles/header/navMain.scss'

const NavBar = () => {
    return(
        <div className='navBarContainer'>
            <Login />
        </div>
    )
}

export default NavBar