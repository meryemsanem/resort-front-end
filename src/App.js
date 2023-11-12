import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/redux/store';
import { NavProvider } from './components/Navigation/Nav';
import Navigation from './components/Navigation/Navigation';
import Resorts from './components/Resort/Resorts';
import Reservations from './components/Resort/Reservations';
import Logout from './components/Resort/Logout';
import Reserve from './components/Resort/Reserve';
import AddResort from './components/Resort/AddResort';
import DeleteResort from './components/Resort/DeleteResort';
import './App.css';
import ResortDetails from './components/Resort/detailpage';

function App() {
  return (
    <Provider store={store}>
      <NavProvider>
        <Router>
          <div className="container">
            <div className="app-container">
              <Navigation />
              <div className="contents">
                <Routes>
                  <Route exact path="/" element={<Resorts />} />
                  <Route path="/reservations" element={<Reservations />} />
                  <Route path="/reserve" element={<Reserve />} />
                  <Route path="/add_resort" element={<AddResort />} />
                  <Route path="/delete_resort" element={<DeleteResort />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/details" element={<ResortDetails />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </NavProvider>
    </Provider>
  );
}

export default App;
