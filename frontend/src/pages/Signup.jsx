import React from 'react';
import logo from '../assets/logo_white.png';


export default function LoginSignupPage() {
    return (
        <div>
            {/* Navbar */}
            <nav className="LoginSignup--Nav">
                <img className="Login--Nav--Logo" src={logo} alt="company logo"/>
            </nav>

            {/* Main container */}
            <div className="LoginSignup--Main">
                <div className="login-registration-block">
                    <h1 className="login-registration-block-title">Sign-up</h1>
                    <form>
                        <div className="form-group">
                            <input
                                type="firstName"
                                id="firstName"
                                name="firstName"
                                placeholder="First name"
                                required/>
                        </div>

                        <div className="form-group">
                            <input
                                type="lastName"
                                id="lastName"
                                name="lastName"
                                placeholder="Last name"
                                required/>
                        </div>

                        <div className="form-group">
                            <input
                                type="departament"
                                id="departament"
                                name="departament"
                                placeholder="Departament"
                                required/>
                        </div>

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
                        
                        <a href='/personalspace' >
                                <button className="btn-account" type="button">Create Account
                                </button>
                            </a>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}