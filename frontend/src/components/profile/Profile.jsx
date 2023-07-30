import React from 'react'
import "./profile.scss"
import { useContext } from 'react';
import { AuthContext } from "../../context/authContext.jsx"


export default function profile() {

    const { currentUser } = useContext(AuthContext);

    return (
        <div className="profile">

            <img
                src={currentUser.profilePicture}
                alt=""
                className="profilePicture"
            />

            <span> {currentUser.firstName} {" "}
                {currentUser.lastName} </span>

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