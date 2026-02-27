import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import HooksDemo from './pages/HooksDemo';
import People from './pages/People';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="bg-white min-vh-100 d-flex flex-column">
        <Navbar />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hooks" element={<HooksDemo />} />
            <Route path="/people" element={<People />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </main>

        <footer className="py-5 bg-dark text-white text-center">
          <div className="container">
            <div className="row g-4 mb-4">
              <div className="col-lg-4 text-lg-start">
                <h4 className="fw-bold mb-3 d-flex align-items-center">
                  <i className="bi bi-rocket-takeoff-fill text-primary me-2"></i>
                  ReactDemo
                </h4>
                <p className="opacity-75 small">
                  Providing cutting-edge industrial solutions with modern technologies to help your business grow and scale in the digital world.
                </p>
              </div>
              <div className="col-lg-4">
                <h5 className="fw-bold mb-3">Quick Links</h5>
                <ul className="list-unstyled opacity-75 small text-center text-lg-start">
                  <li className="mb-2"><a href="#about" className="text-white text-decoration-none">About Us</a></li>
                  <li className="mb-2"><a href="#services" className="text-white text-decoration-none">Our Services</a></li>
                  <li className="mb-2"><a href="#portfolio" className="text-white text-decoration-none">Privacy Policy</a></li>
                  <li><a href="#contact" className="text-white text-decoration-none">Terms of Service</a></li>
                </ul>
              </div>
              <div className="col-lg-4 text-lg-end">
                <h5 className="fw-bold mb-3">Newsletter</h5>
                <div className="input-group mb-3">
                  <input type="text" className="form-control bg-transparent border-secondary text-white" placeholder="Email" />
                  <button className="btn btn-primary" type="button">Subscribe</button>
                </div>
              </div>
            </div>
            <hr className="opacity-25" />
            <p className="mb-0 small opacity-50 py-3">
              &copy; 2026 React Basics Training. All rights reserved. Built with Vite + Bootstrap + React Router.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
