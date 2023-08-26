import React, { useState } from 'react';
import "./createPost.scss";
import { useContext } from 'react';
import { AuthContext } from "../../context/authContext.jsx";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

export default function createPost() {
  // State variables for file and description
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  // Function to upload a file
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  // Get the current user from the authentication context
  const { currentUser } = useContext(AuthContext);

  // Initialize a query client for invalidating queries
  const queryClient = useQueryClient();

  // Use mutation for creating a new post
  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/forum", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate the "feed" query to refresh the feed
        queryClient.invalidateQueries(["feed"]);
      },
    }
  );

  // Function to handle the "Share" button click
  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";

    // If a file is selected, upload it and get the image URL
    if (file) {
      imgUrl = await upload();
    }

    // Create a new post using the mutation
    mutation.mutate({ desc, image: imgUrl });

    // Clear the description and file input
    setDesc("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.firstName}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && <img className="file" alt="" src={URL.createObjectURL(file)} />}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
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
  );
}
