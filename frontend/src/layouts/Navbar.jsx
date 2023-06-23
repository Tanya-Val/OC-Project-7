import React from 'react'
import logo from '../assets/logo_white.png';

export default function Navbar() {
    return (
        <div>
            {/* Navbar */}
            <nav className="PersonaSpace--Nav">
                <img className="Login--Nav--Logo--personalpage" src={logo} alt="company logo"/>
                <div>
                <a href="/forum">
                    <span className="material-symbols-outlined">
                    home</span>
                </a>
                <a href="/personalspace">
                     <span className="material-symbols-outlined">
                    account_circle</span>
                </a>
                <a href="/">
                    <span className="material-symbols-outlined">
                    logout</span>
                </a>
                </div>
            </nav>
        </div>
    )
}