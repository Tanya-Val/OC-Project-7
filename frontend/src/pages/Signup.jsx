import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo_white.png';
import Axios from 'axios';
import { AuthContext } from '../context/authContext.jsx'; // Import the AuthContext
import { useForm } from 'react-hook-form';

export default function SignupPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useContext(AuthContext); // Destructure the login function
  const navigate = useNavigate(); // Initialize useNavigate
  const [signupError, setSignupError] = useState(null); // State to track signup errors
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    department: '',
    email: '',
    password: '',
  });

  const onSubmit = async (data) => {
    try {
      await Axios.post("http://localhost:3000/api/auth/signup", data);
      // Call the login function after successful signup
      await login({ email: data.email, password: data.password });
      // Redirect to /forum after successful signup and login
      navigate('/forum');
    } catch (err) {
      if (err.response.status === 409) {
        // Handle conflict error (User already exists)
        setSignupError("User already exists. Please use a different email.");
        // Reset the form data to the initial state
        setFormData({
          firstName: '',
          lastName: '',
          department: '',
          email: '',
          password: '',
        });
      } else {
        console.log("Error during signup:", err.response.data);
        // Handle other errors (e.g., network issues, server errors)
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("firstName", { required: true })}
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              {errors.firstName && formData.firstName.length === 0 && (
                <p className="errors">This field is required</p>
              )}

              <input
                {...register("lastName", { required: true })}
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
              {errors.lastName && formData.lastName.length === 0 && (
                <p className="errors">This field is required</p>
              )}

              <input
                {...register("department", { required: true })}
                type="text"
                placeholder="Department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
              {errors.department && formData.department.length === 0 && (
                <p className="errors">This field is required</p>
              )}

              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && formData.email.length === 0 && (
                <p className="errors">This field is required</p>
              )}

              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {errors.password && formData.password.length === 0 && (
                <p className="errors">This field is required</p>
              )}

              <button type="submit">Create Account</button>
            </form>
            {signupError && <p className="errors">{signupError}</p>}
          </div>
        </div>
      </div>
    </div >
  )
}
