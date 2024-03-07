import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';


function App() {
  return (
    <Router>
      <>
        <div className="App">
          <Routes>
            <Route 
              path="/"
              exact
              element={<Home />}
            />
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
