import React from 'react'
import profileImage from '../assets/profileImage.png';


export default function NewPost() {
    return (

        
        <div className="mainContainerPostBlock">
            {/*Addign props when connecting ot thedatabase */}
            <div className="ImageFormSpan">
                {/* Placeholder for profile image. Src from databas(to be worked on) */}
                <img className="profileImage" src={profileImage} alt="User profile picture" />

                <form className="form-group">
                    <input type="text" id="text" name="text" placeholder="What's new?" required />
                </form>

            </div>

            <div className="iconsButton">
                {/* Icons */}
                <span className="material-symbols-outlined">
                    gallery_thumbnail
                </span>
                <span className="material-symbols-outlined smallIcon" >
                    feed
                </span>

                {/* Post button, to add the page!!! */}
                <button className="post-button">POST</button>
            </div>
        </div>
    )
}