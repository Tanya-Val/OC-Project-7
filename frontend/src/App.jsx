import './App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './pages/LoginSignup.jsx';
import Signup from './pages/Signup.jsx';
import PersonalSpace from './pages/PersonaSpace.jsx';
import Forum from './pages/Forum.jsx';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/personalspace" element={<PersonalSpace />} />
          <Route path="/forum" element={<Forum />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;