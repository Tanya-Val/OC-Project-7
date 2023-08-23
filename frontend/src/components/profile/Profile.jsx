import React from 'react'
import "./profile.scss"
import { useContext, useState } from 'react';
import { AuthContext } from "../../context/authContext.jsx"
import { useQuery, useMutation } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useLocation } from 'react-router-dom';

export default function Profile() {
    const { currentUser, updateUser } = useContext(AuthContext);
    const userID = useLocation().pathname.split("/")[2];

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


    return (
        <div className="profile">
            <img
                src={data.profilePicture}
                alt=""
                className="profilePicture"
            />

            <input type="file" onChange={(e) => {
                setProfilePicture(e.target.files[0]);
                console.log(e.target.files[0], "console.log(e.target.files[0])"); // Add this line
            }} />


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
            </div>
        </div>
    );
}


// import React from 'react'
// import "./profile.scss"
// import { useContext, useState } from 'react';
// import { AuthContext } from "../../context/authContext.jsx"
// import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
// import { makeRequest } from '../../axios';
// import { useLocation } from 'react-router-dom';

// export default function Profile() {
//     const { currentUser, updateUser  } = useContext(AuthContext);
//     const userID = useLocation().pathname.split("/")[2];

//     // State variables to store user input for each field
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [department, setDepartment] = useState('');
//     const [email, setEmail] = useState('');
//     const [newPassword, setNewPassword] = useState(''); // Add state for newPassword


//     // Fetch user data
//     const { isLoading, error, data } = useQuery(['user'], () =>
//         makeRequest.get('/users/find/' + userID).then((res) => {
//             return res.data;
//         })
//     );

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }

//     // Function to handle form submission
//     const handleUpdate = async () => {
//         // Validate input fields
//         if (!firstName || !lastName || !email) {
//             console.error('Please fill in all required fields.');
//             return;
//         }

//         // Prepare the data to send to the server
//         const updatedData = {
//             firstName,
//             lastName,
//             department,
//             email,
//             password: newPassword, // Add the new password
//         };

//         // Send the updated data to the server
//         try {
//             const response = await makeRequest.put('/users/update/' + userID, updatedData);
//             console.log('Data updated successfully:', response.data);


//             // Update the current user in the context
//             updateUser(updatedData);
//         } catch (error) {
//             console.error('Error updating data:', error);
//         }
//     };


//     return (
//         <div className="profile">
//             <img
//                 src={data.profilePicture}
//                 alt=""
//                 className="profilePicture"
//             />

//             <span>{data.firstName} {data.lastName}</span>

//             <div className="form-container">
//                 <p>Change your personal data</p>
//                 <form>
//                     <input
//                         type="text"
//                         placeholder={data.firstName}
//                         value={firstName}
//                         onChange={(e) => setFirstName(e.target.value)}
//                     />

//                     <input
//                         type="text"
//                         placeholder={data.lastName}
//                         value={lastName}
//                         onChange={(e) => setLastName(e.target.value)}
//                     />

//                     <input
//                         type="text"
//                         placeholder={data.department}
//                         value={department}
//                         onChange={(e) => setDepartment(e.target.value)}
//                     />

//                     <input
//                         type="email"
//                         placeholder={data.email}
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />

//                     <input
//                         type="password"
//                         placeholder="New password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                     />

//                 </form>

//                 <button onClick={handleUpdate}>Update</button>
//             </div>
//         </div>
//     );
// }
