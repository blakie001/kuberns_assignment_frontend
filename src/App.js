import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateApp from './pages/createApp';
import Navbar from './components/Navbar/Navbar.jsx';


const App = () => {
  return (
    <Router>
        <div className="main-content">
          <Routes>
            <Route path="/*" element={<CreateApp />} />
          </Routes>
        </div>
    </Router>
  );
};

export default App;