import React, { useState } from 'react'
import "./post.scss"
import { Link } from 'react-router-dom';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import Comment from '../comment/Comment';
import moment from 'moment';


export default function Post({ post }) {

    const [commentOpen, setCommentOpen] = useState(false);

    //TEMPORARU FUNCTION
    const liked = false;

    

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">

                        <img src={post.profilePicture} alt="profilePicture" />
                        <div className="details" >
                             <Link to={`/personalspace/${post.userID}`} style={{ textDecoration: "none" }}>
                                <span className="name">{post.firstName} {post.lastName}</span>

                            </Link> 
                            <span className="date"> {moment(post.created_date).fromNow()} </span>
                        </div>

                    </div>
                    <MoreHorizRoundedIcon />

                </div>
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={"./upload/" + post.image} alt="" />
                </div>
                <div className="info">
                    <div className="item">
                        {liked ? <FavoriteRoundedIcon /> : < FavoriteBorderRoundedIcon />}
                        12 Likes
                    </div>

                    <div className="item" onClick={()=>setCommentOpen(!commentOpen)}>
                        <ChatBubbleOutlineRoundedIcon />
                        12 Comments
                    </div>

                </div>
                {commentOpen && <Comment key={post.postID} postID={post.postID}/>}

            </div>
        </div>
    )
}