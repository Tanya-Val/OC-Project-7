import React from 'react';
import logo from '../../assets/logo_white.png';
import logoIcon from '../../assets/logo_icon.png';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext.jsx';

export default function Navbar() {
  // Get current user information and logout function from the AuthContext
  const { currentUser, logout } = useContext(AuthContext);

  // Function to handle user logout
  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    window.location.href = '/'; // Redirect to the home page after logout
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="left">
          <Link to="/forum">
            {/* Company logo */}
            <img src={logo} className="logo" alt="company logo" />
            <img src={logoIcon} className="logoIcon" alt="company logo" />
          </Link>
        </div>

        <div className="right">
          {/* Link to the forum home */}
          <Link to="/forum">
            <HomeRoundedIcon fontSize="medium" sx={{ color: 'white' }} />
          </Link>

          {/* Link to the user's personal space */}
          <Link to={`/personalspace/${currentUser.userID}`}>
            <AccountCircleRoundedIcon fontSize="medium" sx={{ color: 'white' }} />
          </Link>

          {/* Button to log out */}
          <a href="/" onClick={handleLogout}>
            <LogoutRoundedIcon fontSize="medium" sx={{ color: 'white' }} />
          </a>

          <div className="user">
            {/* Display the current user's name */}
            <span>
              {currentUser.firstName} {currentUser.lastName}
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}
