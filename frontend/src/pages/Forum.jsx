import React from 'react'
import logo from '../assets/logo_white.png';
import NewPost from '../components/NewPostProps.jsx'
import FeedPost from '../components/FeedPostProps.jsx'

export default function Forum() {
    return (
        <div>
            {/* Navbar */}
            <nav className="PersonaSpace--Nav">
                <img className="Login--Nav--Logo--personalpage" src={logo} alt="company logo" />
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

            {/* Main container */}
            <main className="Forum--Main">

                <div className="forumContainer">

                    {/*Addign props when connecting ot thedatabase */}
                    <NewPost />

                    <FeedPost/>
                    
                </div>
            </main>
        </div>
    )
}