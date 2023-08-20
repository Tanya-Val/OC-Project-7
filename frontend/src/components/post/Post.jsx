import React, { useContext, useState } from 'react'
import "./post.scss"
import { Link } from 'react-router-dom';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import Comment from '../comment/Comment';
import moment from 'moment';

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/authContext.jsx';


export default function Post({ post }) {

    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();

    // Fetch likes
    const { isLoading, error, data } = useQuery(['likes', post.postID], () =>
        makeRequest.get('/likes?postID=' + post.postID).then((res) => {
            return res.data;
        })
    );

    const mutation = useMutation(
        (liked) => {
            if (liked) return makeRequest.delete("/likes?postID=" + post.postID);
            return makeRequest.post("/likes", { postID: post.postID })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["likes"])
            },
        }
    );

    const handleLike = () => {
        mutation.mutate(data.includes(currentUser.userID))
    };

    const [commentOpen, setCommentOpen] = useState(false);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }



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

                    <div className="item" >
                        {data.includes(currentUser.userID)
                            ?
                            <FavoriteRoundedIcon style={{ color: "#D1515A" }} onClick={handleLike} />
                            :
                            < FavoriteBorderRoundedIcon onClick={handleLike} />}
                        {data.length} Likes
                    </div>
                    

                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <ChatBubbleOutlineRoundedIcon />
                        12 Comments
                    </div>

                </div>
                {commentOpen && <Comment key={post.postID} postID={post.postID} />}

            </div>
        </div>
    )
}