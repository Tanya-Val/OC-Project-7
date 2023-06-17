import React, { useState } from 'react';
import logo from '../assets/logo_white.png';
import signUpimage from '../assets/signUp.jpg';
import Axios from 'axios';




export default function LoginSignupPage() {



    const [firstNameReg, setFirstNameReg] = useState('');
    const [lastNameReg, setLastNameReg] = useState('');
    const [departmentReg, setDepartmentReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');


    const register = () => {
        Axios.post('http://localhost:3000/signup', {
            firstName: firstNameReg,
            lastName: lastNameReg,
            department: departmentReg,
            email: emailReg,
            password: passwordReg,
        }).then((response) => {
            console.log(response)
        });
    }

    return (
        <div>
            {/* Navbar */}
            <nav className="LoginSignup--Nav">
                <img className="Login--Nav--Logo" src={logo} alt="company logo" />
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
                                required

                                onChange={(e) => {
                                    setFirstNameReg(e.target.value)
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="lastName"
                                id="lastName"
                                name="lastName"
                                placeholder="Last name"
                                required

                                onChange={(e) => {
                                    setLastNameReg(e.target.value)
                                }}

                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="department"
                                id="department"
                                name="department"
                                placeholder="Department"
                                required

                                onChange={(e) => {
                                    setDepartmentReg(e.target.value)
                                }}

                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                required

                                onChange={(e) => {
                                    setEmailReg(e.target.value)
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                required

                                onChange={(e) => {
                                    setPasswordReg(e.target.value)
                                }}
                            />
                        </div>

                        <a href='/personalspace' >
                            <button onClick={register} className="btn-account" type="button">Create Account
                            </button>
                        </a>

                    </form>
                </div>

                <div className="login-registration-blockSignUp">
                    <img className="corporateImage" id="signUpimage" src={signUpimage} alt="Corporate picture" />
                </div>
            </div>
        </div>
    )
}