import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo_white.png';
import Axios from 'axios';
import { AuthContext } from '../context/authContext.jsx'; // Import the AuthContext
import { useForm } from 'react-hook-form';

export default function SignupPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useContext(AuthContext); // Destructure the login function
  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmit = async (data) => {
    try {
      await Axios.post("http://localhost:3000/api/auth/signup", data);
      // Call the login function after successful signup
      await login({ email: data.email, password: data.password });
      // Redirect to /forum after successful signup and login
      navigate('/forum');
    } catch (err) {
      console.log(err.response.data);
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
              />
              {errors.firstName && <p>This field is required</p>}

              <input
                {...register("lastName", { required: true })}
                type="text"
                placeholder="Last name"
              />
              {errors.lastName && <p>This field is required</p>}

              <input
                {...register("department", { required: true })}
                type="text"
                placeholder="Department"
              />
              {errors.department && <p>This field is required</p>}

              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Enter your email"
              />
              {errors.email && <p>This field is required</p>}

              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Enter your password"
              />
              {errors.password && <p>This field is required</p>}
              
              <button type="submit">Create Account</button>
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}
