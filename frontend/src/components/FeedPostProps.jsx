import React from 'react';
import profileImage from '../assets/profileImage.png';
import feedImage from '../assets/feedImage.jpeg';

export default function FeedPost() {
    return (
        <div className="mainContainerForumBlock">
            <div className="imageContainer">
                <img className="profileImage" src={profileImage} alt="User profile picture" />
            </div>

            <div className="contentContainer">
                <div className="forum-container">
                    <div className="forum-author">
                        <p><strong>Author name</strong></p>
                        <p>Department</p>
                    </div>
                    <div className="forum-feed">
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                        <img className="feedImage" src={feedImage} alt="Feed Image" />
                    </div>
                </div>

                <div className="forum-icons-container">
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
                    <div className="comment-author">
                        <img className="profileImage" src={profileImage} alt="User profile picture" />

                        <div className="comment-author-name">
                            <p><strong>Author name</strong></p>
                            <p>Department</p>
                        </div>
                    </div>
                    <p className="comment">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."</p>
                </div>

            </div>
        </div>
    );
}
