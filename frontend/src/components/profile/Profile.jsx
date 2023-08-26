import React from 'react'
import "./profile.scss"
import { useContext, useState } from 'react';
import { AuthContext } from "../../context/authContext.jsx"
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useLocation } from 'react-router-dom';

export default function Profile() {
    const { updateUser } = useContext(AuthContext);
    const userID = useLocation().pathname.split("/")[2];

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState(''); // Add state for newPassword
    const [profilePicture, setProfilePicture] = useState(null); // Add state for profilePicture

    // Fetch user data
    const { isLoading, error, data } = useQuery(['user'], () =>
        makeRequest.get('/users/find/' + userID).then((res) => {
            return res.data;
        })
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Function to handle form submission
    const handleUpdate = async (e) => {
        e.preventDefault();
        let imgUrl = data?.profilePicture;
        // Validate input fields
        if (!firstName || !lastName || !email) {
            console.error('Please fill in all required fields.');
            return;
        }

        // Prepare the data to send to the server
        let updatedData = {
            firstName,
            lastName,
            department,
            email,
            password: newPassword,
            profilePicture, // Add the new password
        };

        // If a new profile picture has been selected
        if (profilePicture) {
            const formData = new FormData();
            formData.append('file', profilePicture);

            // Log each key/value pair in formData
            for (let pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1].name); // This will log the filename
            }


            try {
                const uploadResponse = await makeRequest.post('/upload', formData);
                if (uploadResponse && uploadResponse.data) {
                    updatedData.profilePicture = uploadResponse.data.filename; // Get the filename from the response
                } else {
                    console.error('uploadResponse or uploadResponse.data is undefined');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                return;
            }
        }

        // Send the updated data to the server
        try {
            const response = await makeRequest.put('/users/update/' + userID, updatedData);
            console.log('Data updated successfully:', response.data);

            // Update the current user in the context
            updateUser(updatedData);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

// Function to handle account deletion
const handleDeleteAccount = async () => {
    // Close the delete confirmation popup
    setShowDeleteConfirmation(false);

    try {
        // Make an API request to delete the user account
        const response = await makeRequest.delete(`/users/delete/${userID}`);
        console.log('Account deleted successfully:', response.data);

        // Redirect to the home page ("/")
        window.location.href = '/';

        // Redirect the user to the login page or handle any other necessary actions
    } catch (error) {
        console.error('Error deleting account:', error);
    }
};


    return (
        <div className="profile">
           
            <span>{data.firstName} {data.lastName}</span>

            <div className="form-container">
                <p>Change your personal data</p>
                <form>
                    <input
                        type="text"
                        placeholder={data.firstName}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder={data.lastName}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder={data.department}
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder={data.email}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                </form>

                <button onClick={handleUpdate}>Update</button>
            
            
            
            {/* Delete Account Button */}
            <button onClick={() => setShowDeleteConfirmation(true)}>Delete Account</button>

            {/* Delete Confirmation Popup */}
            {showDeleteConfirmation && (
                <div className="delete-confirmation">
                    <p className="alertText">Are you sure you want to delete your account?</p>
                    <button className="alertBtn" onClick={handleDeleteAccount}>Confirm</button>
                    <button className="alertCancel"onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
                </div>
            )}
            
            </div>
        </div>
    );
}

