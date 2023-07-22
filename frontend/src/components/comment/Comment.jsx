import React from 'react'
import "./Comment.scss"
import { useContext } from 'react';
import {AuthContext} from "../../context/authContext.jsx"


export default function Comment() {

    const {currentUser} = useContext (AuthContext);
    //Temporary
    const comments = [
        {
            postID: 1,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
            firstName: "Tat1",
            lastName: "Val1",
            userID: 1,
            profilePicture:
                "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
            postID: 2,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
            firstName: "Tat2",
            lastName: "Val2",
            userID: 2,
            profilePicture:
                "https://images.pexels.com/photos/3170635/pexels-photo-3170635.jpeg",
        },
    ];

    return (
        <div className="comments">


            <div className="write">
                {/*image will be fixed after auth context*/}
                <img src={currentUser.profilePicture} alt="" />
                <input type="text" placeholder = "Write a comment" />
                <button>Send</button>

            </div>
            {comments.map((comment) => (
                <div className="comment" key={comment.postID}>
                    <img src={comment.profilePicture} alt="" />
                    <div className="info">
                        <span> {comment.firstName} {comment.lastName} </span>
                        <p> {comment.desc} </p>
                    </div>
                    <span className="time">1 hour ago</span>
                </div>

            ))}

        </div>
    )

}