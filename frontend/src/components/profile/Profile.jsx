import React from 'react'
import "./profile.scss"
import { useContext } from 'react';
import { AuthContext } from "../../context/authContext.jsx"


export default function profile() {

    const { currentUser } = useContext(AuthContext);

    return (
        <div className="profile">

            <img src="https://images.pexels.com/photos/2598024/pexels-photo-2598024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className="profilePicture" />

            <span> My name </span>

            <div className="form-container">
                <p>Change your personal data</p>
                <form>
                    <input
                        type="text"
                        placeholder="New first name"

                    />

                    <input
                        type="text"
                        placeholder="New last name"

                    />

                    <input
                        type="text"
                        placeholder="New Department"
                    />

                    <input
                        type="email"
                        placeholder="New email"
                    />

                    <input
                        type="password"
                        placeholder="New your password"
                    />
                </form>

                <button > Submit </button>
            </div>

        </div>
    )

}