import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo_white.png';
import Axios from 'axios';
import { AuthContext } from '../context/authContext.jsx'; // Import the AuthContext

export default function SignupPage() {
  const [firstNameReg, setFirstNameReg] = useState('');
  const [lastNameReg, setLastNameReg] = useState('');
  const [departmentReg, setDepartmentReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const register = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3000/api/auth/signup', {
      firstName: firstNameReg,
      lastName: lastNameReg,
      department: departmentReg,
      email: emailReg,
      password: passwordReg,
    })
      .then((response) => {
        console.log(response);
        // Registration successful
        // Redirect to another page or show a success message
      })
      .catch((error) => {
        // Handle errors here
        if (error.response && error.response.status === 409) {
          // User already exists, set the error message
          setErrorMessage(error.response.data.error);
        } else {
          // Other errors, set a generic error message
          setErrorMessage('An error occurred during registration.');
        }
        console.error(error);
      });
  };


  // const [firstNameReg, setFirstNameReg] = useState('');
  // const [lastNameReg, setLastNameReg] = useState('');
  // const [departmentReg, setDepartmentReg] = useState('');
  // const [emailReg, setEmailReg] = useState('');
  // const [passwordReg, setPasswordReg] = useState('');

  // const { login } = useContext(AuthContext); // Access the login function from AuthContext
  // const navigate = useNavigate(); // Use navigate from react-router-dom to redirect

  // const register = (e) => {
  //   e.preventDefault();

  //   Axios.post('http://localhost:3000/signup', {
  //     firstName: firstNameReg,
  //     lastName: lastNameReg,
  //     department: departmentReg,
  //     email: emailReg,
  //     password: passwordReg,
  //   }).then((response) => {
  //     console.log(response);
  //     if (response.status === 200) {
  //       // Registration successful
  //       login(); // Call the login function to update the currentUser in AuthContext
  //       navigate('/forum'); // Redirect to the /forum page
  //     }
  //   });
  // };

  return (
    <div>

<div>
      {/* ... Rest of the JSX code ... */}
      {/* Display the error message if it exists */}
      {errorMessage && <div>{errorMessage}</div>}
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
                type="firstName"
                placeholder="First name"
                required
                onChange={(e) => {
                  setFirstNameReg(e.target.value)
                }}
              />

              <input
                type="lastName"
                placeholder="Last name"
                required
                onChange={(e) => {
                  setLastNameReg(e.target.value)
                }}
              />

              <input
                type="department"
                placeholder="Department"
                required
                onChange={(e) => {
                  setDepartmentReg(e.target.value)
                }}
              />

              <input
                type="email"
                placeholder="Enter your email"
                required
                onChange={(e) => {
                  setEmailReg(e.target.value)
                }}
              />

              <input
                type="password"
                placeholder="Enter your password"
                required
                onChange={(e) => {
                  setPasswordReg(e.target.value)
                }}
              />
            </form>

            <button onClick={register} type="button">Create Account</button>
          </div>
        </div>
      </div>
    </div >
  )
}
