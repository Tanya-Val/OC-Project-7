import React, { useState } from 'react'
import "./createPost.scss"
import { useContext } from 'react';
import { AuthContext } from "../../context/authContext.jsx"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';


export default function createPost() {

  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/forum", newPost)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["feed"])
      },
    })



  const handleClick = e => {
    e.preventDefault()
    mutation.mutate({ desc })
  }



  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={currentUser.profilePicture}
            alt=""
          />
          <input type="text"
            placeholder={`What's on your mind ${currentUser.firstName}?`}
            onChange={(e) => setDesc(e.target.value)} />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])} />
            <label htmlFor="file">
              <div className="item">
                <img src="{}" alt="" />
                <span>Add Image</span>
              </div>
            </label>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  )

}