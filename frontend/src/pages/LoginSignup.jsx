import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo_white.png';
import { AuthContext } from '../context/authContext.jsx';

export default function LoginSignupPage() {

  const [error, setError] = useState(null);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Inside handleLogin"); // Log to check if the function is being called

    // Basic validation
    if (!inputs.email || !inputs.password) {
      console.log("Setting error message: Please enter both email and password.");
      setError("Please enter both email and password.");
      // Clear the input fields
      setInputs({
        email: "",
        password: "",
      });
      return;
    }

    try {
      await login(inputs);
      navigate("/forum");
    } catch (err) {
      console.log("Error in login:", err); // Log the error to check if it's caught
      if (err.response && err.response.data) {
        setError(err.response.data.error || "An error occurred during login.");
        // Clear the input fields
        setInputs({
          email: "",
          password: "",
        });
      } else {
        setError("An error occurred during login.");
      }
    }
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
            {/* {error && <p className="error">{error}</p>} */}

            <form>
              <input
                type="email"
                placeholder="Enter your email"
                required
                name="email"
                onChange={handleChange}
                value={inputs.email}
              />

              <input
                type="password"
                placeholder="Enter your password"
                required
                name="password"
                onChange={handleChange}
                value={inputs.password}
              />
            </form>

            {error && <p className="error">{error}</p>}

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
