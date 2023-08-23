import React, { useState } from 'react'
import "./Comment.scss"
import { useContext } from 'react';
import { AuthContext } from "../../context/authContext.jsx"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import moment from 'moment';


export default function Comment({ postID }) {

  const [comment, setComment] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(['comments', postID], () =>
    makeRequest.get("/comments?postID=" + postID).then((res) => {

      return res.data;
    })
  );




  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"])
      },
    })



  const handleClick = async (e) => {
    e.preventDefault();

    mutation.mutate({ comment, postID: postID });
    setComment("");

    console.log(comment)

  };

  const deleteMutation = useMutation(
    (commentID) => {
      return makeRequest.delete("/comments", { data: { commentID } })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"])
      },
    }
  );

  const handleDeleteClick = async (commentID) => {
    console.log('Deleting Comment ID:', commentID); // Log comment ID being deleted
    deleteMutation.mutate(commentID);
  };

  console.log(currentUser.userID )
  


  return (
    <div className="comments">


      <div className="write">

        <img src={currentUser.profilePicture} alt="" />
        <input type="text" placeholder="Write a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)} />
        <button onClick={handleClick}>Send</button>

      </div>
      {isLoading ? "loading" : data.map((comment) => (
        <div className="comment" key={comment.commentID}>
          <img src={comment.profilePicture} alt="" />
          <div className="info">
            <span> {comment.firstName} {comment.lastName} </span>
            <p> {comment.comment} </p>
            {currentUser.userID === comment.userID && (
            <button className ="delete" onClick={() => handleDeleteClick(comment.commentID)}>Delete</button>
          )}
          </div>
          <span className="time">{moment(comment.created_date).fromNow()}</span>
          
          {console.log(comment.userID)}
        </div>

      ))}

    </div>
  )

}