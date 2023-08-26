import React, { useContext, useState } from 'react';
import "./post.scss";
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

    const [postDesc, setPostDesc] = useState(post.desc); 

    // Fetch likes using a query
    const { isLoading, error, data } = useQuery(['likes', post.postID], () =>
        makeRequest.get('/likes?postID=' + post.postID).then((res) => {
            return res.data;
        })
    );

    // Define a mutation to handle liking and unliking a post
    const mutation = useMutation(
        (liked) => {
            if (liked) return makeRequest.delete("/likes?postID=" + post.postID);
            return makeRequest.post("/likes", { postID: post.postID })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["likes"]);
            },
        }
    );

    // Function to handle liking/unliking a post
    const handleLike = () => {
        mutation.mutate(data.includes(currentUser.userID))
    };

    // State to manage comment visibility
    const [commentOpen, setCommentOpen] = useState(false);

    // State to store new description for post editing
    let newDescForMutation = ''; 

    // Define a mutation to edit the post description
    const editPostMutation = useMutation((newDesc) => {
        return makeRequest.put(`/forum/${post.postID}`, { newDesc });
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["likes"]);
            setPostDesc(newDescForMutation); 
        },
    });

    // Function to handle post editing
    const handleEdit = () => {
        const newDesc = prompt("Edit your post:", postDesc);
        if (newDesc !== null) {
            newDescForMutation = newDesc; 
            editPostMutation.mutate(newDescForMutation); 
            setPostDesc(newDescForMutation);
        }
    };

    // Define a mutation to add a comment
    const addCommentMutation = useMutation(
        (newComment) => makeRequest.post('/comments', newComment),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['countComments'], { refetchActive: true });
            },
        }
    );

    // Function to handle adding a comment
    const handleAddComment = () => {
        addCommentMutation.mutate();
    };

    // Query to fetch comment count
    const { data: commentCount } = useQuery(['countComments', post.postID], () =>
        makeRequest.get(`/comments/count?postID=${post.postID}`).then((res) => {
            return res.data;
        })
    );

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
                    {post.userID === currentUser.userID && (
                        <button className="edit" onClick={() => handleEdit(post.postID)}>Edit</button>
                    )}
                    <img src={"./upload/" + post.image} alt="" />
                </div>
                <div className="info">
                    <div className="item" >
                        {data.includes(currentUser.userID)
                            ?
                            <FavoriteRoundedIcon style={{ color: "#D1515A" }} onClick={handleLike} />
                            :
                            <FavoriteBorderRoundedIcon onClick={handleLike} />}
                        {data.length} Likes
                    </div>
                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <ChatBubbleOutlineRoundedIcon />
                        {commentCount} Comments
                    </div>
                </div>
                {commentOpen && <Comment key={post.postID} postID={post.postID} handleAddComment={handleAddComment} />}
            </div>
        </div>
    )
}
