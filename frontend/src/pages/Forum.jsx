import React from 'react'
import logo from '../assets/logo_white.png';

export default function Forum() {
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

            {/* Main container */}
            <main className="Forum--Main">

                <div className="forumContainer">
                    <div className="mainContainerPostBlock">
                        <span className="material-symbols-outlined">forum</span>
                        <form className="form-group">
                            <input type="text" id="text" name="text" placeholder="New post" required/>
                        </form>
                        <span className="material-symbols-outlined">
                            gallery_thumbnail
                        </span>
                    </div>

                    <div className="mainContainerForumBlock">
                        <div className="forum-block-content">
                            <div className="forum-author">
                                <h3>Author name</h3>
                                <h4>Forum content</h4>
                            </div>
                            <div className="forum-image">
                                <span className="material-symbols-outlined" id="image">
                                    gallery_thumbnail
                                </span>
                            </div>
                        </div>
                        <div className="forum-block-icons">
                            <span className="material-symbols-outlined">
                                thumb_up
                            </span>
                            <span className="material-symbols-outlined">
                                thumb_down
                            </span>
                            <span className="material-symbols-outlined">
                                comment
                            </span>
                            <span className="material-symbols-outlined">
                                delete
                            </span>
                        </div>

                        <div className="forum-comment">
                            <h4>Comments</h4>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}