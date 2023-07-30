import React from 'react'
import logo from '../../assets/logo_white.png';
import logoIcon from '../../assets/logo_icon.png';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Link } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../../context/authContext.jsx'; // Import the AuthContext

export default function Navbar() {

    const { currentUser } = useContext(AuthContext);
    return (
        <div>
            {/* Navbar */}
            <nav className="navbar">
                <div className="left">
                    <Link to='/forum'>
                        <img src={logo} className="logo" alt="company logo" />
                        <img src={logoIcon} className="logoIcon" alt="company logo" />

                    </Link>
                </div>

                <div className="right">

                    <Link to='/forum'>
                        <HomeRoundedIcon fontSize="medium" sx={{ color: 'white' }} />
                    </Link>

                    <Link to='/personalspace/:id'>
                        <AccountCircleRoundedIcon fontSize="medium" sx={{ color: 'white' }} />
                    </Link>

                    <Link to='/signup'>
                        <LogoutRoundedIcon fontSize="medium" sx={{ color: 'white' }} />
                    </Link>

                    <div className='user'>
                        <img
                            src={currentUser.profilePicture}
                            alt=""
                        />
                        <span>{currentUser.firstName} {" "}
                            {currentUser.lastName}
                        </span>
                    </div>
                </div>
            </nav>
        </div>
    )
}