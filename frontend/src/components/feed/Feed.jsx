import React from 'react'
import "./feed.scss"
import Post from '../post/Post.jsx'

export default function Feed() {

    //Temporaty data
    const posts = [
        {
            postID: 1,
            firstName: "Tanya",
            lastName: "Val",
            userID: 1,
            profilePicture:
                "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            image: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
        },
        {
            postID: 2,
            firstName: "Tanya1",
            lastName: "Val1",
            userID: 2,
            profilePicture:
                "https://images.pexels.com/photos/3170635/pexels-photo-3170635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            image: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",

        },
    ];

    return <div className="posts">
        {posts.map(post => (
            <Post post={post} key={post.postID} />
        ))}
    </div>;

}