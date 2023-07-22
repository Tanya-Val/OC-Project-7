import React from 'react'
import logo from '../../assets/logo_white.png';
import logoIcon from '../../assets/logo_icon.png';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Link } from 'react-router-dom';

export default function Navbar() {
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
                        <HomeRoundedIcon fontSize="large" sx={{ color: 'white' }} />
                    </Link>

                    <Link to='/personalspace/:id'>
                        <AccountCircleRoundedIcon fontSize="large" sx={{ color: 'white' }} />
                    </Link>

                    <Link to='/signup'>
                        <LogoutRoundedIcon fontSize="large" sx={{ color: 'white' }} />
                    </Link>



                    <div className='user'>
                        <img src="https://images.pexels.com/photos/3182765/pexels-photo-3182765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                        <span>My name</span>
                    </div>

                    <Link to='/'>
                        <LogoutRoundedIcon fontSize="large" sx={{ color: 'white' }} />
                    </Link>

                </div>
            </nav>
        </div>
    )
}