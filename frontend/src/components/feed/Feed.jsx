import React from 'react';
import Post from '../post/Post.jsx';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

export default function Feed() {
  const { isLoading, error, data } = useQuery(['feed'], () =>
    makeRequest.get('/forum').then((res) => {
      return res.data;
    })
    
  );

  console.log(data)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  

  return (
    <div className="posts">
      {data.map((post) => (
        <Post post={post} key={post.postID} />
      ))}
    </div>
  );
}
