import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavProvider } from './components/Navigation/Nav';
import Navigation from './components/Navigation/Navigation';
import HomePage from './components/Resort/HomePage';
import Reservations from './components/Resort/Reservations';
import Resorts from './components/Resort/Resorts';
import Reserve from './components/Resort/Reserve';
import AddResort from './components/Resort/AddResort';
import DeleteResort from './components/Resort/DeleteResort';

function App() {
  return (
    <NavProvider>
      <Router>
        {' '}
        <div className="container">
          <div className="app-container">
            <Navigation />
            <div className="contents">
              <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/resorts" element={<Resorts />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/reserve" element={<Reserve />} />
                <Route path="/add_resort" element={<AddResort />} />
                <Route path="/delete_resort" element={<DeleteResort />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </NavProvider>
  );
}

export default App;
