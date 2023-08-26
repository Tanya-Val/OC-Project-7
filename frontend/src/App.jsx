import './App.scss'
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginSignup from './pages/LoginSignup.jsx';
import Signup from './pages/Signup.jsx';
import PersonalSpace from './pages/PersonaSpace.jsx';
import Forum from './pages/Forum.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import { useContext } from 'react';
import { AuthContext } from './context/authContext.jsx'; // Import the AuthContext
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a new instance of QueryClient
const queryClient = new QueryClient()

function App() {
  // Access the currentUser from AuthContext
  const { currentUser } = useContext(AuthContext);

  // Define the layout component, which includes Navbar and Outlet
  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div>
          <Navbar />
          <Outlet />
        </div>
      </QueryClientProvider>
    );
  };

  // Define a ProtectedRoute component to protect routes that require authentication
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />;
    }
    return children;
  };

  // Create a router using createBrowserRouter
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
        },
      ],
    },
    {
      path: "/personalspace/:id",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/personalspace/:id",
          element: <PersonalSpace />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
