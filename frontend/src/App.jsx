import './App.scss'
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginSignup from './pages/LoginSignup.jsx';
import Signup from './pages/Signup.jsx';
import PersonalSpace from './pages/PersonaSpace.jsx';
import Forum from './pages/Forum.jsx';
import Navbar from './layouts/Navbar.jsx';
import { useContext } from 'react';


function App() {

  //change to false for restriction 
  const currentUser = true;


  const Layout = () => {
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginSignup />,
    },

    {
      path: "/signup",
      element: <Signup />,
    },

    {
      path: "/forum",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/forum",
          element: <Forum />,
        }
      ]
    },

    {
      path: "/personalspace/:id",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [{
        path: "/personalspace/:id",
        element: <PersonalSpace />,
      }]
    },
  ]);


  return (
    <RouterProvider router={router} />
    
  );
}

export default App;