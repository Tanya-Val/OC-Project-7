import React, { useState } from 'react'
import "./createPost.scss"
import { useContext } from 'react';
import { AuthContext } from "../../context/authContext.jsx"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';


export default function createPost() {

  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;

    } catch (err) {
      console.log(err)
    }
  }

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



  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, image: imgUrl });
    setDesc("");
    setFile(null);
  };



  return (
    <div className="share">
      <div className="container">
        <div className="top">

          <div className="left">

            <img
              src={currentUser.profilePicture}
              alt=""
            />
            <input type="text"
              placeholder={`What's on your mind ${currentUser.firstName}?`}
              onChange={(e) => setDesc(e.target.value)} />

          </div>

          <div className="right">

            {file && <img className="file" alt="" src={ URL.createObjectURL(file)}/>}
          </div>

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