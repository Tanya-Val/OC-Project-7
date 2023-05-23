import React from 'react'
import logo from '../assets/logo_white.png';
import './Signup.jsx'

export default function LoginSignupPage() {
    return (
        <div>
            {/* Navbar */}
            <nav className="LoginSignup--Nav">
                <img className="Login--Nav--Logo" src={logo} alt="company logo"/>
            </nav>

            {/* Main container */}
            <div className="LoginSignup--Main">
                <div className="titles">
                    <h1>CONNECT-E</h1>
                </div>

                <div className="login-registration-block">
                    <form>
                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                required/>
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                required/>
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
            </div>
        </div>
    )
}