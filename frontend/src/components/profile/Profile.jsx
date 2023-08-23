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



// import React from 'react';
// import "./profile.scss";
// import { useContext, useState, useEffect } from 'react';
// import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
// import { makeRequest } from '../../axios';
// import { useLocation } from 'react-router-dom';


// export default function Profile() {
//     const { pathname } = useLocation();
//     const userID = pathname.split("/")[2];

//     const { isLoading, error, data } = useQuery(['user', userID], () =>
//         makeRequest.get('/users/find/' + userID).then((res) => {
//             return res.data;
//         })
//     );
//     console.log(data, "___________")

//     const [profilePicture, setProfilePicture] = useState(null);
//     const [texts, setTexts] = useState({
//         firstName: "",
//         lastName: "",
//         department: ""
//     });

//     useEffect(() => {
//         if (data) {
//             setTexts({
//                 firstName: data.firstName || "",
//                 lastName: data.lastName || "",
//                 department: data.department || ""
//             });
//         }
//     }, [data]);

//     const handleChange = (e) => {
//         setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//     const handleFileChange = (e) => {
//         setProfilePicture(e.target.files[0]);
//     };

//     const queryClient = useQueryClient();

//     const mutation = useMutation(
//         (user) => {
//             return makeRequest.put("/users", user).then(() => user);
//         },
//         {
//             onSuccess: (user) => {
//                 queryClient.invalidateQueries(['user', userID]);
//                 console.log(user, "++++++++++++++++++")
//             },
//         }
//     );


//     const upload = async (file) => {
//         const formData = new FormData();
//         formData.append('file', file);

//         const response = await makeRequest.post('/upload', formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });

//         return response.data;
//     };



//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         let imgUrl = data?.profilePicture; // Use optional chaining to handle undefined data
//         if (profilePicture) {
//             const uploadResponse = await upload(profilePicture);
//             imgUrl = uploadResponse.fileUrl;
//         }

//         const updatedUser = { ...texts, profilePicture: imgUrl };
//         console.log(updatedUser); // Log the updated user object

//         mutation.mutate(updatedUser);
//     };

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }

//     return (
//         <div className="profile">
//             <img
//                 src={data?.profilePicture}
//                 alt=""
//                 className="profilePicture"
//             />

//             <input
//                 type="file"
//                 name="profilePicture"
//                 onChange={handleFileChange}
//             />
//             <span>{data?.firstName} {data?.lastName}</span>

//             <div className="form-container">
//                 <p>Change your personal data</p>
//                 <form>
//                     <input
//                         type="text"
//                         placeholder={data?.firstName}
//                         name="firstName"
//                         value={texts.firstName}
//                         onChange={handleChange}
//                     />

//                     <input
//                         type="text"
//                         placeholder={data?.lastName}
//                         name="lastName"
//                         value={texts.lastName}
//                         onChange={handleChange}
//                     />

//                     <input
//                         type="text"
//                         placeholder={data?.department}
//                         name="department"
//                         value={texts.department}
//                         onChange={handleChange}
//                     />

//                     <button onClick={handleUpdate}>Update</button>
//                 </form>
//             </div>
//         </div>
//     );
// }
