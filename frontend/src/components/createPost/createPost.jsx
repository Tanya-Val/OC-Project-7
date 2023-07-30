import React from 'react'
import "./createPost.scss"
import { useContext } from 'react';
import { AuthContext } from "../../context/authContext.jsx"


export default function createPost() {

    const { currentUser } = useContext(AuthContext);

    return (
        <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={currentUser.profilePicture}
            alt=""
          />
          <input type="text" placeholder={`What's on your mind ${currentUser.firstName}?`} />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} />
            <label htmlFor="file">
              <div className="item">
                <img src="{}" alt="" />
                <span>Add Image</span>
              </div>
            </label>
          </div>
          <div className="right">
            <button>Share</button>
          </div>
        </div>
      </div>
    </div>
    )

}