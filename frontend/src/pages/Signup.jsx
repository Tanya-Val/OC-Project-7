import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../assets/logo_white.png';
import Axios from 'axios';


export default function SignupPage() {

    const [firstNameReg, setFirstNameReg] = useState('');
    const [lastNameReg, setLastNameReg] = useState('');
    const [departmentReg, setDepartmentReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');


    const register = (e) => {
        e.preventDefault();

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
                        <span>Alredy have an account?</span>
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

                        <button onClick={register} type="button">Create Account
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}