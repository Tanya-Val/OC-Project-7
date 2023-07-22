import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo_white.png';
import Axios from 'axios';
import { AuthContext } from '../context/authContext.jsx'; // Import the AuthContext

export default function LoginSignupPage() {
  const [emailLog, setEmailLog] = useState('')
  const [passwordLog, setPasswordLog] = useState('')

  const { login } = useContext(AuthContext); // Access the login function from AuthContext
  const navigate = useNavigate(); // Use navigate from react-router-dom to redirect

  const [loginStatus, setLoginStatus] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    login(
        Axios.post('http://localhost:3000/', {
            email: emailLog,
            password: passwordLog,
          }).then((response) => {
            if (response.data.message) {
              setLoginStatus(response.data.message);
            } else {
              setLoginStatus(response.data[0].email);
              login(); // Call the login function to update the currentUser in AuthContext
              navigate('/forum'); // Redirect to the /forum page
            }
          })
    );
    
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="left">
          <Link to='/forum'>
            <img src={logo} alt="company logo" />
          </Link>
        </div>
      </nav>

      {/* Main container */}
      <div className="Login">
        <div className="LoginSignup--Main">
          <div className="login-form-container">
            <h2>Welcome back!</h2>
            <p> {loginStatus} </p>
            <form>
              <input
                type="email"
                placeholder="Enter your email"
                required
                onChange={(e) => {
                  setEmailLog(e.target.value)
                }}
              />

              <input
                type="password"
                placeholder="Enter your password"
                required
                onChange={(e) => {
                  setPasswordLog(e.target.value)
                }}
              />
            </form>
            <button onClick={handleLogin} type="button">Login</button>
          </div>

          <div className="login-image-container">
            <h1>CONNECT-E</h1>
            <p>Our company, a multinational retail corporation, is expanding by the day. We've grown by 100% over the
              last three years, and we now employ over 600 people.</p>
            <span>Join us now!</span>
            <Link to="/signup">
              <button type="button">Create Account</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
