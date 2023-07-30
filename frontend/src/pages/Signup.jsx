import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo_white.png';
import Axios from 'axios';
import { AuthContext } from '../context/authContext.jsx'; // Import the AuthContext


export default function SignupPage() {

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    department: "",
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext); // Destructure the login function
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [err, setErr] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await Axios.post("http://localhost:3000/api/auth/signup", inputs);
      // Call the login function after successful signup
      await login({ email: inputs.email, password: inputs.password });
      // Redirect to /forum after successful signup and login
      navigate('/forum');
    } catch (err) {
      setErr(err.response.data);
    }
  };

  console.log(err);


  return (
    <div>

      <div>

      </div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="left">
          <Link to='/forum'>
            <img src={logo} alt="company logo" />
          </Link>
        </div>
      </nav>

      {/* Main container */}
      <div className="Signup">
        <div className="Signup--Main">
          <div className="Singup-image-container">
            <h1>CONNECT-E</h1>
            <span>Already have an account?</span>
            <Link to='/'>
              <button type="button">Login</button>
            </Link>
          </div>

          <div className="signup-form-container">
            <h2>Sign-up</h2>
            <form>
              <input
                type="text"
                placeholder="First name"
                required
                name="firstName"
                onChange={handleChange}
              />

              <input
                type="text"
                placeholder="Last name"
                required
                name="lastName"
                onChange={handleChange}
              />

              <input
                type="text"
                placeholder="Department"
                required
                name="department"
                onChange={handleChange}
              />

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
            {err && err}
            <button onClick={handleClick} type="button">Create Account</button>
          </div>
        </div>
      </div>
    </div >
  )
}
