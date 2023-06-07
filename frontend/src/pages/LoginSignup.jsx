import React from 'react'
import logo from '../assets/logo_white.png';
import corporate from '../assets/corporate.jpg';
import './Signup.jsx'

export default function LoginSignupPage() {
    return (
        <div>
            {/* Navbar */}
            <nav className="LoginSignup--Nav">
                <img className="Login--Nav--Logo" src={logo} alt="company logo" />
            </nav>

            {/* Main container */}
            <div className="LoginSignup--Main">
                <div className="login-registration-block">

                <div className="login-title">
                        <h2>Welcome back!</h2>
                    </div>
                    <form>
                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                required />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                required />
                        </div>

                        <a href='/signup'>
                            <button className="btn-login" type="submit" >Login</button>
                        </a>
                        <a href='/signup'>
                            <button className="btn-account" type="button">Create Account
                            </button>
                        </a>

                    </form>
                </div>
                <div className="login-registration-blockSignUp">
                    <div className="titles">
                        <h1>CONNECT-E</h1>
                    </div>
                    <img className="corporateImage" src={corporate} alt="Corporate picture" />

                </div>

            </div>
        </div>
    )
}