import React from 'react'
import Feed from '../components/feed/Feed.jsx'
import CreatePost from '../components/createPost/createPost.jsx'

//import FeedPost from '../components/FeedPostProps.jsx'

export default function Forum() {
    return (
        <div className="Forum--Main">
            {/*Addign props when connecting ot thedatabase */}
            <CreatePost />
            <Feed />

        </div>
    )
}