import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo_white.png';
import { AuthContext } from '../context/authContext.jsx'; // Import the AuthContext

export default function LoginSignupPage() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  // Handle changes in input fields
  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Access the login function from AuthContext
  const { login } = useContext(AuthContext);

  // Handle the login process
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs); // Call the login function from AuthContext
      navigate("/forum"); // Redirect to the forum after successful login
    } catch (err) {
      setErr(err.response.data); // Set error message if login fails
    };
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
            {/* Display login status or error message */}
            {/* <p> {loginStatus} </p> */}

            <form>
              <input
                type="email"
                placeholder="Enter your email"
                required
                name="email"
                onChange={handleChange}
              />

              <input
                type="password"
                placeholder="Enter your password"
                required
                name="password"
                onChange={handleChange}
              />
            </form>

            <button onClick={handleLogin} type="button">Login</button>
          </div>

          <div className="login-image-container">
            <h1>CONNECT-E</h1>
            <p>Our company, a multinational retail corporation, is expanding by the day. We've grown by 100% over the
              last three years, and we now employ over 600 people.</p>
            <span>Join us now!</span>

            {/* Link to the signup page */}
            <Link to="/signup">
              <button type="button">Create Account</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
