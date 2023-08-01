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


const queryClient = new QueryClient()

function App() {

  //change to false for restriction TEST
  //const currentUser = false;

  // Access the currentUser from AuthContext
  const { currentUser } = useContext(AuthContext);


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
