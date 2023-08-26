import React, { useState } from 'react';
import "./Comment.scss";
import { useContext } from 'react';
import { AuthContext } from "../../context/authContext.jsx";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import moment from 'moment';

export default function Comment({ postID, handleAddComment }) {

  // State for storing the comment input value
  const [comment, setComment] = useState("");

  // Get the current user from the authentication context
  const { currentUser } = useContext(AuthContext);

  // Fetch comments for the specified post using React Query
  const { isLoading, error, data } = useQuery(['comments', postID], () =>
    makeRequest.get("/comments?postID=" + postID).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  // Define a mutation for adding a new comment
  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment)
    },
    {
      onSuccess: () => {
        // Invalidate the 'comments' query when a new comment is successfully added
        queryClient.invalidateQueries(["comments"])
      },
    })

  // Handle the click event when the "Send" button is clicked
  const handleClick = async (e) => {
    e.preventDefault();

    // Check if the comment is not empty
    if (comment.trim() === '') {
      return;
    }

    // Trigger the mutation to add a new comment and reset the comment input
    mutation.mutate({ comment, postID: postID });
    setComment("");
    handleAddComment(comment);
  };

  // Define a mutation for deleting a comment
  const deleteMutation = useMutation(
    (commentID) => {
      return makeRequest.delete("/comments", { data: { commentID } })
    },
    {
      onSuccess: () => {
        // Invalidate the 'comments' query and 'countComments' query when a comment is successfully deleted
        queryClient.invalidateQueries(["comments"])
        queryClient.invalidateQueries(['countComments', postID]);
      },
    }
  );

  // Handle the click event when the "Delete" button is clicked
  const handleDeleteClick = async (commentID) => {
    deleteMutation.mutate(commentID);
  };

  return (
    <div className="comments">
      <div className="write">
        {/* Input field for entering a new comment */}
        <input type="text" placeholder="Write a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)} />
        {/* Button to submit a new comment */}
        <button onClick={handleClick}>Send</button>
      </div>
      {/* Display comments if not loading */}
      {isLoading ? "loading" : data.map((comment) => (
        <div className="comment" key={comment.commentID}>
          <div className="info">
            {/* Display the commenter's name and comment */}
            <span> {comment.firstName} {comment.lastName} </span>
            <p> {comment.comment} </p>
            {/* Display a "Delete" button for the current user's comments */}
            {currentUser.userID === comment.userID && (
              <button className="delete" onClick={() =>
                handleDeleteClick(comment.commentID)}>Delete</button>
            )}
          </div>
          {/* Display the time when the comment was created */}
          <span className="time">{moment(comment.created_date).fromNow()}</span>
        </div>
      ))}
    </div>
  )
}
