import React from 'react';
import Post from '../post/Post.jsx';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

export default function Feed() {
  // Fetch posts from the server using a query
  const { isLoading, error, data } = useQuery(['feed'], () =>
    makeRequest.get('/forum').then((res) => {
      return res.data;
    })
  );

  // If the data is still loading, display a loading message
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If there is an error, display an error message
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Render the fetched posts
  return (
    <div className="posts">
      {data.map((post) => (
        // Render each post using the Post component
        <Post post={post} key={post.postID} />
      ))}
    </div>
  );
}
