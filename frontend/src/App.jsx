import './App.scss'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginSignup from './pages/LoginSignup.jsx';
import Signup from './pages/Signup.jsx';
import PersonalSpace from './pages/PersonaSpace.jsx';
import Forum from './pages/Forum.jsx';
import Navbar from './layouts/Navbar.jsx'


function App() {

  const Layout = () => {
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    )

  }

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
      element: <Layout />,
      children: [
        {
          path: "/forum",
          element: <Forum />,
        }
      ]
    },

    {
      path: "/personalspace",
      element: <Layout />,
      children: [{
        path: "/personalspace",
        element: <PersonalSpace />,
      }]
    },
  ]);


  return (
    <RouterProvider router={router} />
    // <Router>
    //   <div>
    //     <Routes>
    //       <Route path="/" element={<LoginSignup />} />
    //       <Route path="/signup" element={<Signup />} />
    //       <Route path="/personalspace" element={<PersonalSpace />} />
    //       <Route path="/forum" element={<Forum />} />
    //     </Routes>
    //   </div>
    // </Router>
  );
}

export default App;